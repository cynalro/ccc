<?php

namespace Tests\Feature\API\V1\Category;

use App\Models\Core\Category;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

/**
 * @group Api.V1.Category
 * @group Api.V1.Category.ProductControllerTest
 */
class ProductControllerTest extends TestCase
{
    use RefreshDatabase;

    public function testAll()
    {
        $category = factory(Category::class)->create();
        

        //  Store
        $response = $this->postJson('/api/v1/categories/1/products', []);

        $response->assertStatus(422);

        $response = $this->postJson('/api/v1/categories/1/products', [
            'name' => 'Product test',
            'sku' => 'skutest',
            'price' => 10000,
        ]);

        $response->assertStatus(201)
            ->assertJson([
                'data' => [
                    'id' => 1,
                    'name' => 'Product test',
                    'sku' => 'skutest',
                    'price' => 10000,
                    'category_id' =>$category->id,
                ],
            ])
        ;

        //Validate Store same Sku
        $response = $this->postJson('/api/v1/categories/1/products', [
            'name' => 'Product test1',
            'sku' => 'skutest',
            'price' => 10000,
            'category_id' =>$category->id,
        ]);
        $response->assertStatus(422);

        //  Show
        $response = $this->get('/api/v1/categories/1/products/1');

        $response->assertStatus(200)
            ->assertJson([
                'data' => [
                    'id' => 1,
                    'name' => 'Product test',
                    'sku' => 'skutest',
                    'price' => 10000,
                    'category_id' =>$category->id,
                ],
            ])
        ;

        //  Update
        $response = $this->patchJson('/api/v1/categories/1/products/1', [
            'name' => 'Product Update',
            'sku' => 'skutest Update',
        ]);

        $response->assertStatus(200)
            ->assertJson([
                'data' => [
                    'id' => 1,
                    'name' => 'Product Update',
                    'sku' => 'skutest Update',
                    'price' => 10000,
                    'category_id' =>$category->id,
                ],
            ]);

        

        //Validete update with same sku
        $response = $this->patchJson('/api/v1/categories/1/products/1', [
            'name' => 'Product Update2',
            'sku' => 'skutest Update',
        ]);
        $response->assertStatus(200)
            ->assertJson([
                'data' => [
                    'id' => 1,
                    'name' => 'Product Update2',
                    'sku' => 'skutest Update',
                    'price' => 10000,
                    'category_id' =>$category->id,
                ],
            ]);
        

        //  Index
        $response = $this->get('/api/v1/categories/1/products');

        $response->assertStatus(200)
            ->assertJson([
                'data' => [
                    [
                        'id' => 1,
                        'name' => 'Product Update2',
                        'sku' => 'skutest Update',
                        'price' => 10000,
                        'category_id' =>$category->id,
                        
                    ],
                ],
            ])
        ;

        //  Destroy
        $response = $this->delete('/api/v1/categories/1/products/1');

        $response->assertStatus(204);
    }
}
