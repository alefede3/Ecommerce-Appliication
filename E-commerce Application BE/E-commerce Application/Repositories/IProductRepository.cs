using WebApplication1.Models;

namespace WebApplication1.Repositories;

public interface IProductRepository
{
    IEnumerable<Product> GetAllProducts();
    Product GetProductById(int id);

    void UpdateProductQuantity(IEnumerable<Product> products);
}