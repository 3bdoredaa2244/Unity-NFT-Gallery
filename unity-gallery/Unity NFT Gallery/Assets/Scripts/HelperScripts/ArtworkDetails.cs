public class ArtworkDetails
{
    public string owner;
    public bool isForSale;
    public string price;

    public ArtworkDetails (string owner, bool isForSale, string price)
    {
        this.owner = owner;
        this.isForSale = isForSale;
        this.price = price;
    }
}