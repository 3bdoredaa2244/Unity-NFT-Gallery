using System.Collections.Generic;

public class Attribute 
{
    public string trait_type {get; set;}
    public string value { get; set;}
    public string display_type {get;set;}
}

public class OpenSeaMetadata
{
    public List<Attribute> attributes {get;set;}
    public string description {get;set;}
    public string external_url {get;set;}
    public string image {get;set;}
    public string name {get;set;}
}

