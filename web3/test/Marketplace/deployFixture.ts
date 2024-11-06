import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { Artwork, Marketplace } from "../../typechain";
const { ethers, upgrades } = require("hardhat");

let Deployer: SignerWithAddress;
let Alice: SignerWithAddress;
let Bob: SignerWithAddress;

let ArtworkContract: Artwork;
let MarketplaceContract: Marketplace;

const deployFixture = async () => {
  [Deployer, Alice, Bob] = await ethers.getSigners();

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

  const tokenURI1 =
    "https://opensea-creatures-api.herokuapp.com/api/creature/1";
  const tokenURI2 =
    "https://opensea-creatures-api.herokuapp.com/api/creature/2";

  await ArtworkContract.connect(Alice).mint(tokenURI1);
  await ArtworkContract.connect(Bob).mint(tokenURI2);

  return {
    Deployer,
    Alice,
    Bob,
    ArtworkContract,
    MarketplaceContract,
    tokenURI1,
    tokenURI2,
  };
};

export default deployFixture;
