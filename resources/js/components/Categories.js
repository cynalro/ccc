import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

const baseUrl = "http://localhost/api_ccc/public/";

export default class Categories extends Component {
  constructor(props){
    super(props);
    this.state = {      
      categories:[],      
      name:'',
      category_id:0,
      edit: false,      
    }
    this.handleChangeName = this.handleChangeName.bind(this);    
  }

  componentDidMount(){    
    this.loadCategories();
  }

  handleChangeName(event) {
    this.setState({name: event.target.value});
  }
  render() {
    return (
      <div className="container">          
        <h3>cliente APIRest</h3>
        <hr/>
        <div>          
          <button type="button" className="btn btn-primary col-md-3" onClick={()=>this.newProduct()}>
                Crear Categoria
          </button>
          <a href={baseUrl+'products'} className="btn btn-primary col-md-3 float-right" tabIndex="-1" role="button" aria-disabled="true">Ver Productos</a>
        </div>
        <table className="table table-striped">
          <thead className="thead-dark">
            <tr>
              <th>Id</th>
              <th>Categoria</th>
              <th>Acciones</th>              
            </tr>
          </thead>
          <tbody>
            {this.renderList()}
          </tbody>
        </table>

        <form>
          <div className="modal fade" id="categoryForm" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">Formulario de Categorias</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Nombre de la Categoria </label>
                    <input type="text" className="form-control" value={this.state.name} onChange={this.handleChangeName} />
                  </div> 
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                  {
                    this.state.edit?
                      <button type="button" className="btn btn-primary" onClick={()=>this.updateCategory()}>Actualizar</button>
                    :
                      <button type="button" className="btn btn-primary" onClick={()=>this.addCategory()}>Guardar</button>
                  }                
                </div>
              </div>
            </div>
          </div>
        </form>

      </div>
    );
  }

  renderList(){
    return this.state.categories.map((data)=>{
      return(
        <tr key={data.id}>
          <td>{data.id}</td>
          <td>{data.name}</td> 
          <td>
            <button type="button" className="btn btn-primary mx-1" onClick={()=>this.editCategory(data)}>Editar <FontAwesomeIcon icon={faEdit} /></button>
            <button type="button" className="btn btn-danger mx-1" onClick={()=>this.deletedCategory(data.id)}>Eliminar <FontAwesomeIcon icon={faTrashAlt} /></button>           
          </td>         
        </tr>
      )
    })
  }
  
  addCategory(){

    this.setState({
      edit:false      
    })
    const dataF = { name:this.state.name }      

    axios.post(baseUrl+'api/v1/categories',dataF).then(response=>{
         if (response.status==201) {
           alert('Categoria Agregada Exitosamente...') 
           this.setState({
            name:''            
          })          
           this.loadCategories()
           $("#categoryForm").modal("hide");
         }
     }).catch(error=>{
       alert("Error "+error)
     })
  }

  changeStatuEdit(){
    this.setState({
      name:'',
      price:'',
      sku:'',
      category_id:0,
      edit:false
    })
  }

  //Muestra el modal con el formulario para ingresar productos
  newProduct(){
    this.changeStatuEdit()
    $("#categoryForm").modal("show");     
  }

  editCategory(data){
    this.setState({
      ...data,
      category_id:data.id,
      edit:true
    })

    $("#categoryForm").modal("show");
    console.log(data);
  }

  updateCategory(){
    const id = this.state.category_id
    const data = {
      name:this.state.name,                                       
    }
    console.log(data);

    axios.put(baseUrl+'api/v1/categories/'+id, data).then(response=>{
         if (response.status==200) {
           alert('Categoria Actualizada Exitosamente...')
           this.setState({
             name:'',
             category_id:0
           })           
           this.loadCategories()
           $("#categoryForm").modal("hide");
         }
     }).catch(error=>{
       alert("Error "+error)
     })
  }

  deletedCategory(id){ 

    axios.delete(baseUrl+'api/v1/categories/'+id).then(response=>{
         if (response.status==204) {
           alert('Categoria Eliminada Exitosamente...')           
           this.loadCategories()           
         }
     }).catch(error=>{
       alert("Error "+error)
     })
  }
  
  loadCategories(){
    axios.get(baseUrl+'api/v1/categories').then(response=>{
      this.setState({categories:response.data.data})
    }).catch(error=>{
      alert("Error "+error)
    })
  }
}

if (document.getElementById('categories')) {
    ReactDOM.render(<Categories />, document.getElementById('categories'));
}