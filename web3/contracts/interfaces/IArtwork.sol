// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

interface IArtwork {

    // FUNCTIONS

    /// @dev Initializing function necessary for upgradeable contracts to replace constructors
    /// @param name The name of the NFT contract
    /// @param symbol The symbol used to refer to this NFT contract
    /// @param _marketplaceContract The address of the Marketplace contract
    function initialize(string calldata name, string calldata symbol, address _marketplaceContract) external;

    /// @dev Used to mint an NFT from this contract
    /// @param _tokenURI The URI associated with the token to be minted
    function mint(string calldata _tokenURI) external;
}