using Microsoft.AspNetCore.Mvc;
using WebApplication1.Models;
using WebApplication1.Services;

namespace WebApplication1.Controllers;

[ApiController]
public class ProductController : Controller
{
    private readonly ProductService _productService;

    public ProductController(ProductService productService)
    {
        _productService = productService;
    }

    [HttpGet("all")]
    public IEnumerable<Product> GetAllProducts()
    {
        return _productService.GetAllProducts();
    }

    [HttpPatch("updateQuantity")]
    public void UpdateProductQuantity([FromBody] IEnumerable<Product> products)
    {
        _productService.UpdateProductQuantity(products);
    }
}