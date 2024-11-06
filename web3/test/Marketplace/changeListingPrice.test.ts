import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";
import deployFixture from "./deployFixture";

describe("Marketplace changeListingPrice tests", () => {
  it("Should not allow a price that isn't greater than zero", async () => {
    const { MarketplaceContract } = await loadFixture(deployFixture);

    expect(
      MarketplaceContract.changeListingPrice(ethers.utils.parseEther("0"))
    ).be.revertedWithCustomError(
      MarketplaceContract,
      "PriceIsntGreaterThanZero"
    );
  });

  it("Should not allow user who is not the owner to change the listing price", async () => {
    const { MarketplaceContract, Alice } = await loadFixture(deployFixture);

    expect(
      MarketplaceContract.connect(Alice).changeListingPrice(
        ethers.utils.parseEther("1")
      )
    ).be.revertedWithCustomError(
      MarketplaceContract,
      "OnlyOwnerCanChangePrice"
    );
  });

  it("Should allow the changing of the listing price ", async () => {
    const { MarketplaceContract, Deployer } = await loadFixture(deployFixture);

    expect(
      MarketplaceContract.connect(Deployer).changeListingPrice(
        ethers.utils.parseEther("0.2")
      )
    ).not.be.reverted;
  });
});
