import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { Artwork, Marketplace } from "../../typechain";
const { ethers, upgrades } = require("hardhat");

let Deployer: SignerWithAddress;
let Alice: SignerWithAddress;

let ArtworkContract: Artwork;
let MarketplaceContract: Marketplace;

const deployFixture = async () => {
  [Deployer, Alice] = await ethers.getSigners();

  const Marketplace_Contract = await ethers.getContractFactory(
    "Marketplace",
    Deployer
  );
  MarketplaceContract = await upgrades.deployProxy(Marketplace_Contract);
  await MarketplaceContract.deployed();

  const Artwork_Contract = await ethers.getContractFactory("Artwork", Deployer);
  ArtworkContract = await upgrades.deployProxy(Artwork_Contract, [
    "ArtworkContract",
    "ART",
    MarketplaceContract.address,
  ]);
  await ArtworkContract.deployed();

  return {
    Deployer,
    Alice,
    ArtworkContract,
  };
};

export default deployFixture;
