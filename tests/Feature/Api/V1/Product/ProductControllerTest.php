<?php

namespace Tests\Feature\Api\V1\Product;

use App\Models\Core\Category;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

/**
 * @group Api.V1.Product
 * @group Api.V1.Product.ProductController
 */
class ProductControllerTest extends TestCase
{
    use RefreshDatabase;

    /**
     * A basic feature test example.
     */
    public function testAll()
    {
        $category = factory(Category::class)->create();

        //  Store
        $response = $this->postJson('/api/v1/products', []);

        $response->assertStatus(422);

       
        //Store
        $response = $this->postJson('/api/v1/products', [
            'name' => 'Product Store',
            'sku' => 'Product sku',
            'price' => 10000.88,
            'category_id' => $category->id,
        ]);

        $response->assertStatus(201);

        $response->assertStatus(201)
            ->assertJson([
                'data' => [
                    'id' => 1,
                    'name' => 'Product Store',
                    'sku' => 'Product sku',
                    'price' => 10000.88,
                    'category_id' => $category->id,
                ],
            ])
        ;

        //Store with same sku
        $response = $this->postJson('/api/v1/products', [
            'name' => 'Product Store',
            'sku' => 'Product sku',
            'price' => 10000.88,
            'category_id' => $category->id,
        ]);
        $response->assertStatus(422);

        //  Show
        $response = $this->get('/api/v1/products/1');

        $response->assertStatus(200)
            ->assertJson([
                'data' => [
                    'id' => 1,
                    'name' => 'Product Store',
                    'sku' => 'Product sku',
                    'price' => 10000.88,
                    'category_id' =>  $category->id,
                ],
            ])
        ;

        //  Update
        $response = $this->patchJson('/api/v1/products/1', [
            'name' => 'Product Update',
            'sku' => 'Product sku update',
            'price' => 11111.88,
        ]);

        $response->assertStatus(200)
            ->assertJson([
                'data' => [
                    'id' => 1,
                    'name' => 'Product Update',
                    'sku' => 'Product sku update',
                    'price' => 11111.88,
                    'category_id' => $category->id,
                ],
            ])
        ;

        //  Index
        $response = $this->get('/api/v1/products');

        $response->assertStatus(200)
            ->assertJson([
                'data' => [
                    [
                        'id' => 1,
                        'name' => 'Product Update',
                        'sku' => 'Product sku update',
                        'price' => 11111.88,
                        'category_id' => $category->id,
                    ],
                ],
            ])
        ;

        //  Destroy
        $response = $this->delete('/api/v1/products/1');

        $response->assertStatus(204);
    }
}
