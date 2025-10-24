using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using WebApplication1.Data;
using WebApplication1.Models;

namespace WebApplication1.Repositories;

public class ProductRepository : IProductRepository
{
    private readonly ApplicationDbContext _context;
    
    public ProductRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public IEnumerable<Product> GetAllProducts()
    {
        return _context.product;
    }

    public Product GetProductById(int id)
    { 
        return _context.product.Find(id);
    }

    public void UpdateProductQuantity(IEnumerable<Product> products)
    {
        foreach (var product in products)
        {
            var prod = _context.product.Find(product.idproduct);
            var newQuantity = 0;
            if (prod != null)
            {
                newQuantity = product.quantity - product.cartQuantity;
                prod.quantity = newQuantity;
            }
        }

        _context.SaveChanges();
    }
}