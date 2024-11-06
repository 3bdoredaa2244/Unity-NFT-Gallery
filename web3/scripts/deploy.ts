import {
  artwork1,
  artwork2,
  artwork3,
  artwork4,
  artwork5,
} from "../metadata/metadata";

const { ethers, upgrades } = require("hardhat");

async function main() {
  const Marketplace_Contract = await ethers.getContractFactory("Marketplace");
  console.log("\n\tBeginning to deploy the Marketplace contract...");
  const MarketplaceContract = await upgrades.deployProxy(Marketplace_Contract);
  await MarketplaceContract.deployed();

  console.log("\n\tMarketplace deployed: ", MarketplaceContract.address);

  const Artwork_Contract = await ethers.getContractFactory("Artwork");
  console.log("\n\tBeginning to deploy the Artwork contract...");
  const ArtworkContract = await upgrades.deployProxy(Artwork_Contract, [
    "ArtworkContract",
    "ART",
    MarketplaceContract.address,
  ]);
  await ArtworkContract.deployed();

  console.log("\n\tArtwork deployed: ", ArtworkContract.address);

  await ArtworkContract.mint(artwork1);
  console.log("\n\tArtwork1 minted");

  await ArtworkContract.mint(artwork2);
  console.log("\n\tArtwork2 minted");

  await ArtworkContract.mint(artwork3);
  console.log("\n\tArtwork3 minted");

  await ArtworkContract.mint(artwork4);
  console.log("\n\tArtwork4 minted");

  await ArtworkContract.mint(artwork5);
  console.log("\n\tArtwork5 minted");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
