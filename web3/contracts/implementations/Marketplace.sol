// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/interfaces/IERC721.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

import "../interfaces/IMarketplace.sol";

contract Marketplace is IMarketplace, Initializable {
    uint256 public itemCounter;
    address payable owner;
    uint256 public listingPrice;

    mapping(uint256 => MarketItem) private marketItems;

    function initialize() public initializer {
        itemCounter = 0;
        owner = payable(msg.sender);
        listingPrice = 0.01 ether;
    }

    function listMarketItem(address nftContractAddress, uint256 tokenId, uint256 price) public payable {
        if(IERC721(nftContractAddress).ownerOf(tokenId) != msg.sender) revert OnlyOwnerCanListItem();
        if(msg.value != listingPrice) revert ValueNotListingPrice();
        if(price <= 0) revert PriceIsntGreaterThanZero();

        marketItems[itemCounter] = MarketItem(
            itemCounter,
            nftContractAddress,
            tokenId,
            payable(msg.sender),
            address(0),
            price,
            false,
            true
        );

        IERC721(nftContractAddress).transferFrom(
            msg.sender,
            address(this),
            tokenId
        );

        payable(owner).transfer(listingPrice);

        emit MarketItemListed(itemCounter, nftContractAddress, tokenId, msg.sender, address(0), price);

        itemCounter += 1;
    }

    function buyMarketItem(uint256 itemId) public payable {
        if(!marketItems[itemId].isPresent) revert ItemNotInMarketplace();
        if(marketItems[itemId].isSold) revert ItemAlreadySold();
        if(marketItems[itemId].price != msg.value) revert ValueNotPurchasePrice();

        marketItems[itemId].isSold = true;
        marketItems[itemId].owner = payable(msg.sender);

        IERC721(marketItems[itemId].nftContractAddress).transferFrom(
            address(this),
            msg.sender,
            marketItems[itemId].tokenId
        );
    }

    function getMarketItem(uint256 itemId) public view returns (MarketItem memory item)
    {
        if(!marketItems[itemId].isPresent) revert ItemNotInMarketplace();
        return marketItems[itemId];
    }

    function changeListingPrice(uint256 newPrice) public {
        if(newPrice <= 0) revert PriceIsntGreaterThanZero();
        if(msg.sender == owner) revert OnlyOwnerCanChangePrice();
        listingPrice = newPrice;
    }
}