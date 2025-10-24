using WebApplication1.Models;
using WebApplication1.Repositories;

namespace WebApplication1.Services;

public class PurchasesAndOrdersService
{
    private readonly IPurchasesAndOrdersRepository _purchasesAndOrdersRepository;

    public PurchasesAndOrdersService(IPurchasesAndOrdersRepository purchasesAndOrdersRepository)
    {
        _purchasesAndOrdersRepository = purchasesAndOrdersRepository;
    }

    public void SaveProductsOrdered(IEnumerable<Product> products)
    {
        _purchasesAndOrdersRepository.SaveProductsOrdered(products);
    }

    public IEnumerable<PurchasedHistory> GetOrders()
    {
        return _purchasesAndOrdersRepository.GetOrders();
    }
}