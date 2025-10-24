using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication1.Models;

[Table("product")]
public class Product
{
    [Key] public int idproduct { get; set; }

    [Column("name")] public string name { get; set; }

    [Column("description")] public string description { get; set; }

    [Column("price")] public float price { get; set; }

    [Column("quantity")] public int quantity { get; set; }

    [Column("image")] public string image { get; set; }

    [Column("cartQuantity")] public int cartQuantity { get; set; }
}