using WebApplication1.Models;
using WebApplication1.Repositories;

namespace WebApplication1.Services;

public class ProductService
{
    private readonly IProductRepository _productRepository;

    public ProductService(IProductRepository productRepository)
    {
        _productRepository = productRepository;
    }

    public IEnumerable<Product> GetAllProducts()
    {
        return _productRepository.GetAllProducts();
    }

    public void UpdateProductQuantity(IEnumerable<Product> products)
    {
        _productRepository.UpdateProductQuantity(products);
    }
}