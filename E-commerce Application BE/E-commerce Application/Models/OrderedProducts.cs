using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication1.Models;

[Table("ordered_products")]
public class OrderedProducts
{
    [Column("quantityProduct")]
    public int QuantityProduct { get; set; }
    
    [ForeignKey(nameof(Product))]
    public int idProduct { get; set; }
    public Product Product { get; set; }

    [ForeignKey(nameof(PurchasedHistory))]
    public int idPurchasedHistory { get; set; }
    public PurchasedHistory PurchasedHistory { get; set; }
    
}