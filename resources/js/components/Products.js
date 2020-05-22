import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const baseUrl = "http://localhost/api_ccc/public/";

export default class Products extends Component {
  constructor(props){
    super(props);
    this.state = {      
      products:[],
      categories:[],
      category_id:'',
      product_id:'',
      name:'',
      sku:'',
      price:'',
      edit:false,
    }
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeSku  = this.handleChangeSku.bind(this);
    this.handleChangePrice  = this.handleChangePrice.bind(this);
    this.handleChangeCategory = this.handleChangeCategory.bind(this);
  }

  componentDidMount(){
    this.loadProducts();
    this.loadCategories();
  }

  handleChangeName(event) {
    this.setState({name: event.target.value});
  }

  handleChangeSku(event) {
    this.setState({sku: event.target.value});
  }

  handleChangePrice(event) {
    this.setState({price: event.target.value});
  }

  handleChangeCategory(event){
    this.setState({category_id: event.target.value});
  }

  render() {
    return (
      <div className="container">          
        <h3>cliente APIRest</h3>
        <hr/>
        <div>          
          <button type="button" className="btn btn-primary col-md-3" data-toggle="modal" data-target="#productForm">
                Crear Producto
          </button>

          <a href={baseUrl+'categories'} class="btn btn-primary col-md-3 float-right" tabindex="-1" role="button" aria-disabled="true">Ver Categorias</a>

          
        </div>
        <table className="table table-striped">
          <thead className="thead-dark">
            <tr>
              <th>ID</th>
              <th>Productos</th>
              <th>Descripcion</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {this.renderProducts()}
          </tbody>
        </table>

        <form>
          <div ref="putomodal" className="modal fade" id="productForm" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">Formulario de producto</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Nombre de Producto </label>
                    <input type="text" className="form-control" value={this.state.name} onChange={this.handleChangeName} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">SKU del Producto</label>
                    <textarea className="form-control" rows="3" value={this.state.sku} onChange={this.handleChangeSku}></textarea>
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Precio del Producto</label>
                    <input type="number" className="form-control" value={this.state.price} onChange={this.handleChangePrice} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Categoria</label>
                    <select value={this.state.category_id} onChange={this.handleChangeCategory} required>
                      <option>Seleccione</option>
                      {this.renderSelect()} 
                    </select>                   
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                  {
                    this.state.edit?
                      <button type="button" className="btn btn-primary" onClick={()=>this.updateProduct()}>Actualizar</button>
                    :
                      <button type="button" className="btn btn-primary" onClick={()=>this.addProduct()}>Guardar</button>
                  }
                </div>
              </div>
            </div>
          </div>
        </form>

      </div>
    );
  }

  renderProducts(){
    return this.state.products.map((data)=>{
      return(
        <tr key={data.id}>
          <td>{data.id}</td>
          <td>{data.name}</td>
          <td>{data.sku}</td>
          <td>{data.price}</td>
          <td>
            <button type="button" className="btn btn-primary mx-1" onClick={()=>this.editProduct(data)}>Editar <FontAwesomeIcon icon={faEdit} /></button>
            <button type="button" className="btn btn-danger mx-1" onClick={()=>this.deleteProduct(data.id)}>Eliminar <FontAwesomeIcon icon={faTrashAlt} /></button>           
          </td>
        </tr>
      )
    })
  }

  renderSelect(){
    return this.state.categories.map((data)=>{
      return(
        <option key={data.id} value={data.id}>{data.name}</option>        
      )
    })
  }

  addProduct(){
    this.setState({
      edit:false      
    })
    const dataF = {
                    name:this.state.name,
                    sku:this.state.sku,
                    price:this.state.price,
                    category_id:this.state.category_id,                    
                  }

    console.log(dataF);    

    axios.post(baseUrl+'api/v1/products', dataF).then(response=>{
         if (response.status==201) {
           alert('Producto Agregado Exitosamente...')           
           this.loadProducts()
           $("#productForm").modal("hide");
         }
     }).catch(error=>{
       alert("Error "+error)
     })
  }

  //Muestra el modal con la infomacion del productos
  editProduct(data){

    this.setState({
      ...data,      
      product_id:data.id,      
      edit:true
    })

    $("#productForm").modal("show");    
  }

  //actuliza la informacion de un producto
  updateProduct(){

    const id = this.state.product_id
    const data = {
      name:this.state.name,
      price:this.state.price, 
      sku:this.state.sku, 
      category_id:this.state.category_id,                                       
    }   

    axios.put(baseUrl+'api/v1/products/'+id, data).then(response=>{
         if (response.status==200) {
           alert('Producto Actualizado Exitosamente...')
           this.setState({
             name:'',
             sku:'',
             price:'',
             category_id:0,
             edit:false
           })           
           this.loadProducts()
           $("#productForm").modal("hide");
         }
     }).catch(error=>{
       alert("Error "+error)
     })
  }

  //Elimina un producto por el id
  deleteProduct(id){

    axios.delete(baseUrl+'api/v1/products/'+id).then(response=>{
         if (response.status==204) {
           alert('Producto Eliminado Exitosamente...')           
           this.loadProducts()           
         }
     }).catch(error=>{
       alert("Error "+error)
     })
  }

  //Carga los productos de la BD para armar la tabla
  loadProducts(){

    axios.get(baseUrl+'api/v1/products').then(response=>{
      this.setState({products:response.data.data})
    }).catch(error=>{
      alert("Error "+error)
    })
  }

  //trae las categorias de la BD para armar el select
  loadCategories(){

    axios.get(baseUrl+'api/v1/categories').then(response=>{
      this.setState({categories:response.data.data})
    }).catch(error=>{
      alert("Error "+error)
    })
  }
}

if (document.getElementById('products')) {
    ReactDOM.render(<Products />, document.getElementById('products'));
}