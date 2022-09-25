// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import { ByteHasher } from './helpers/ByteHasher.sol';
import { IWorldID } from './interfaces/IWorldID.sol';
import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Hubster is ERC721URIStorage {
    using ByteHasher for bytes;

    error InvalidNullifier();
    IWorldID internal immutable worldId;
    uint256 internal immutable groupId = 1;
    mapping(uint256 => bool) internal nullifierHashes;
    string actionId = "wid_staging_4e245125700e19e33721f5a0ed5afc46";

    using Counters for Counters.Counter;
    Counters.Counter public _profileIds;
    mapping(address => bool) public isVerified;
    mapping(address => bool) public hasProfileNft;
    mapping(address => uint256) public profileToId;

    event ProofVerified(address user);

    constructor(IWorldID _worldId) ERC721("MyProfile", "PNFT"){
        worldId = _worldId;
        isVerified[0x04F7Cf1528eBE06cf86ae5cdAe060FD6Cfc3e1e2] = true;
        isVerified[0xF90359B7953807f57715Fc6ac0Bf6F569a5DD269] = true;
        isVerified[0xeA15A9902d395705Fa2D37ACDC71e3d95eF8084A] = true;
    }

    function addressTokenUri(address user) public view returns (string memory) {
        string memory UriProfile = tokenURI(profileToId[user]);
        return UriProfile;
    }


    function mintWorkNft(address user, string memory tokenURI) public returns(uint256) {
        require(hasProfileNft[user] == true, "User needs profile nft"); 
        
        uint256 newItemId = _profileIds.current();
        _mint(user, newItemId);
        _setTokenURI(newItemId, tokenURI);

        profileToId[user] = newItemId;
        _profileIds.increment();
        return newItemId;
    }

    function mintProfileNft(address user, string memory tokenURI) public returns(uint256) {
        require(isVerified[user] == true, "Verifiy with WorldId");
        uint256 newItemId = _profileIds.current();
        _mint(user, newItemId);
        _setTokenURI(newItemId, tokenURI);

        profileToId[user] = newItemId;
        _profileIds.increment();
        hasProfileNft[user] = true;
        return newItemId;
    }

    function localMintProfile(address user, string memory tokenURI) public returns(uint256) {
        // Profile mint added without worldcoin verification incase worldcoin doesnt work
        uint256 newItemId = _profileIds.current();
        _mint(user, newItemId);
        _setTokenURI(newItemId, tokenURI);

        profileToId[user] = newItemId;
        _profileIds.increment();
        hasProfileNft[user] = true;
        return newItemId;
    }

    function verifyAndExecute(
        //string memory tokenURI,
        address receiver,
        uint256 root,
        uint256 nullifierHash,
        uint256[8] calldata proof
    ) public {
        // first, we make sure this person hasn't done this before
        if (nullifierHashes[nullifierHash]) revert InvalidNullifier();

        // then, we verify they're registered with WorldID, and the input they've provided is correct
        worldId.verifyProof(
            root,
            groupId,
            abi.encodePacked(receiver).hashToField(),
            nullifierHash,
            abi.encodePacked(actionId).hashToField(),
            proof
        );

        // finally, we record they've done this, so they can't do it again (proof of uniqueness)
        nullifierHashes[nullifierHash] = true;

        // logic
        
        //mintProfileNft(receiver, tokenURI);
        isVerified[msg.sender] = true;
        emit ProofVerified(receiver);
    }
}
