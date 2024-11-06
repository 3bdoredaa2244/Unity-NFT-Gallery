using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using TMPro;

public class ProximityScript : MonoBehaviour
{
    public string newTitle;
    public string newDesc;
    public string newOwner;
    public string newIsForSale;
    public string newPrice;

    private Transform other;

    private TMP_Text myTitle;
    private TMP_Text myDescription;
    private TMP_Text artOwner;
    private TMP_Text artIsForSale;
    private TMP_Text artPrice;

    private float dist;

    private GameObject player;
    private GameObject artTitle;
    private GameObject description;
    private GameObject owner;
    private GameObject isForSale;
    private GameObject price;

    private bool check;

    // Start is called before the first frame update
    void Start()
    {
        player = GameObject.FindWithTag("Player");
        other = player.GetComponent<Transform>();

        artTitle = GameObject.FindWithTag("Title");
        description = GameObject.FindWithTag("Description");
        owner = GameObject.FindWithTag("Owner");
        isForSale = GameObject.FindWithTag("OnSale");
        price = GameObject.FindWithTag("Price");

        myTitle = artTitle.GetComponent<TMP_Text>();
        myTitle.text = "";

        myDescription = description.GetComponent<TMP_Text>();
        myDescription.text = "";

        artOwner = owner.GetComponent<TMP_Text>();
        artOwner.text = "";

        artIsForSale = isForSale.GetComponent<TMP_Text>();
        artIsForSale.text = "";

        artPrice = price.GetComponent<TMP_Text>();
        artPrice.text = "";

        check = false;
    }

    // Update is called once per frame
    void Update()
    {
        if (other)
        {
            dist = Vector3.Distance(transform.position, other.position);
            if (dist <= 3)
            {
                myTitle.text = newTitle;
                myDescription.text = newDesc;
                artOwner.text = newOwner;
                artIsForSale.text = newIsForSale;
                artPrice.text = newPrice;

                check = true;
            }
            if (dist > 3 && check == true)
            {
                Start();
            }
        }
    }
}