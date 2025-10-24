using Microsoft.AspNetCore.Mvc;
using WebApplication1.Models;
using WebApplication1.Services;

namespace WebApplication1.Controllers;

public class PurchasesAndOrdersController : Controller
{
    private readonly PurchasesAndOrdersService _purchasesAndOrders;

    public PurchasesAndOrdersController(PurchasesAndOrdersService purchasesAndOrders)
    {
        _purchasesAndOrders = purchasesAndOrders;
    }

    [HttpPost("saveOrders")]
    public void SaveProductsOrdered([FromBody] IEnumerable<Product> products)
    {
        foreach (var product in products)
        {
            Console.WriteLine(product + " nel controller");
        }

        _purchasesAndOrders.SaveProductsOrdered(products);
    }

    [HttpGet("getOrders")]
    public IEnumerable<PurchasedHistory> GetOrders()
    {
        return _purchasesAndOrders.GetOrders();
    }
}