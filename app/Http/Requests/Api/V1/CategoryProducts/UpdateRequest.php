<?php

namespace App\Http\Requests\Api\V1\CategoryProducts;

use Illuminate\Foundation\Http\FormRequest;

class UpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'sku' => 'unique:products,sku,'.$this->product->id.'|max:255',
            'price' => 'numeric',
        ];
    }
}
