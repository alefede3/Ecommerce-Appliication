using System.Runtime.InteropServices.JavaScript;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Data;
using WebApplication1.Models;

namespace WebApplication1.Repositories;

public class PurchasesAndOrdersRepository : IPurchasesAndOrdersRepository
{
    private readonly ApplicationDbContext _context;

    public PurchasesAndOrdersRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public void SaveProductsOrdered(IEnumerable<Product> products)
    {
        float total = 0;
        foreach (var product in products)
        {
            total += (product.price * product.cartQuantity);
        }
        
        var history = new PurchasedHistory
        {
            orderDate = DateTime.Today.ToUniversalTime(),
            total = total,
        };
        
        _context.PurchasedHistory.Add(history);
        _context.SaveChanges(); 
        
        Console.WriteLine(history);
        
        foreach (var product in products)
        {
            var orderedProducts = new OrderedProducts();
            {
                orderedProducts.idProduct = product.idproduct;
                orderedProducts.QuantityProduct =  product.cartQuantity;
                orderedProducts.idPurchasedHistory = history.idPurchasedHistory;
            }
            _context.OrderedProducts.Add(orderedProducts);
        }
        _context.SaveChanges();
    }

    public IEnumerable<PurchasedHistory> GetOrders()
    {
        return _context.PurchasedHistory.Include(ph => ph.OrderedProducts)
            .ThenInclude(product => product.Product);
    }
}