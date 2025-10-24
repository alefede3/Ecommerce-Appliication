using WebApplication1.Models;

namespace WebApplication1.Repositories;

public interface IPurchasesAndOrdersRepository
{
    void SaveProductsOrdered(IEnumerable<Product> products);
    
    IEnumerable<PurchasedHistory> GetOrders();
}