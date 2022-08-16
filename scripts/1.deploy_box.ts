// scripts/1.deploy_box.ts
import { ethers } from "hardhat";
import { upgrades } from "hardhat";


// 我们使用upgrades.deployProxy()部署一个可升级的合约Box.sol。
// 三个合约将被部署: 实现合约、ProxyAdmin、Proxy。我们记录他们的地址。
async function main() {
  const Box = await ethers.getContractFactory("Box");
  console.log("Deploying Box...");
  const box = await upgrades.deployProxy(Box, [42], { initializer: "store" });

  console.log(box.address, " box(proxy) address");
  console.log(
    await upgrades.erc1967.getImplementationAddress(box.address),
    " getImplementationAddress"
  );
  console.log(
    await upgrades.erc1967.getAdminAddress(box.address),
    " getAdminAddress"
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
