// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

interface IMarketplace {

    // STRUCTS

    /// @dev Represents the format for an item listed on the marketplace
    struct MarketItem {
        uint256 itemId;
        address nftContractAddress;
        uint256 tokenId;
        address payable seller;
        address owner;
        uint256 price;
        bool isSold;
        bool isPresent;
    }

    // EVENTS

    /// @dev Emitted when an item is listed on the marketplace
    /// @param itemId The id of the marketplace item
    /// @param nftContractAddress The address of the NFT
    /// @param tokenId The id of the NFT
    /// @param seller The address who is selling the NFT
    /// @param owner The address that owns the NFT
    /// @param price The price of the NFT
    event MarketItemListed(
        uint256 indexed itemId,
        address indexed nftContractAddress,
        uint256 indexed tokenId,
        address seller,
        address owner,
        uint256 price
    );

    // FUNCTIONS

    /// @dev Lets the user list an item on the marketplace
    /// @param nftContractAddress The address of the NFT
    /// @param tokenId The id of the NFT
    /// @param price The price of the NFT
    function listMarketItem(address nftContractAddress, uint256 tokenId, uint256 price) external payable;

    /// @dev Enables user to purchase an item from the marketplace
    /// @param itemId The id of the item on the marketplace
    function buyMarketItem(uint256 itemId) external payable;

    /// @dev Retrieves an individual marketplace item
    /// @param itemId The id of the item on the marketplace
    function getMarketItem(uint itemId) external view returns (MarketItem memory item);

    /// @dev Enables user to change the listing price for the marketpalce
    /// @param newPrice The new price for the item on the marketplace
    function changeListingPrice(uint256 newPrice) external;

    // ERRORS

    /// @dev Value does not match the listing price
    error ValueNotListingPrice();

    /// @dev Price isn't a positive integer
    error PriceIsntGreaterThanZero();

    /// @dev Item isn't present on the marketplace
    error ItemNotInMarketplace();

    /// @dev Item is already sold
    error ItemAlreadySold();

    /// @dev Value does not match the purchase price
    error ValueNotPurchasePrice();

    /// @dev User doesn't own the item
    error OnlyOwnerCanChangePrice();

    /// @dev Caller doesn't own the NFT
    error OnlyOwnerCanListItem();

    /// @dev Item is already listed on the marketplace
    error ItemAlreadyListed();
}