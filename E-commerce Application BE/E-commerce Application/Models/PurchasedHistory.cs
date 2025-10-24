using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication1.Models;

[Table("purchased_history")]
public class PurchasedHistory
{
    [Key]
    public int idPurchasedHistory { get; set; }
    
    [Column("orderDate")]
    public DateTime orderDate { get; set; }
    
    [Column("total")]
    public float total { get; set; }
    
    public ICollection<OrderedProducts> OrderedProducts { get; set; }
}