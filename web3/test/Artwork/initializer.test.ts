import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";
import deployFixture from "./deployFixture";

describe("Artwork initializer tests", () => {
  it("Should not allow re-initializing", async () => {
    const { ArtworkContract } = await loadFixture(deployFixture);

    await expect(
      ArtworkContract.initialize(
        "ArtworkContract",
        "ART",
        ethers.constants.AddressZero
      )
    ).to.be.reverted;
  });
});
