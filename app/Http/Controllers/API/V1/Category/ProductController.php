<?php

namespace App\Http\Controllers\Api\V1\Category;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\CategoryProducts\StoreRequest;
use App\Http\Requests\Api\V1\CategoryProducts\UpdateRequest;
use App\Http\Resources\Api\V1\Product\ProductResource;
use App\Models\Core\Category;
use App\Models\Core\Product;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     *
     *
     */
    public function index(Category $category)
    {
        return ProductResource::collection($category->products()->paginate());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\Response
     *
     *
     */
    public function store(Category $category, StoreRequest $request)
    {
        return new ProductResource(
            $category->products()->save(new Product($request->all()))
        );
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     *
     * @return \Illuminate\Http\Response
     *
     *
     */
    public function show(Category $category, Product $product)
    {
        return new ProductResource($product);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int                      $id
     *
     * @return \Illuminate\Http\Response
     *
     */
    public function update(UpdateRequest $request, Category $category, Product $product)
    {
        $product->fill($request->all());
        $product->update();

        return new ProductResource($product);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     *
     * @return \Illuminate\Http\Response
     *
     *
     */
    public function destroy(Category $category, Product $product)
    {
        $product->delete();

        return response()->json(null, 204);
    }
}
