/*-
 * ‌
 * Hedera JavaScript SDK
 * ​
 * Copyright (C) 2020 - 2023 Hedera Hashgraph, LLC
 * ​
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ‍
 */

import * as cryptography from "@hashgraph/cryptography";
import CACHE from "./Cache.js";

/**
 * @typedef {import("./PrivateKey.js").default} PrivateKey
 */

/**
 * Multi-word mnemonic phrase (BIP-39).
 *
 * Compatible with the official Hedera mobile
 * wallets (24-words or 22-words) and BRD (12-words).
 */
export default class Mnemonic {
    /**
     * @param {cryptography.Mnemonic} mnemonic
     * @hideconstructor
     * @private
     */
    constructor(mnemonic) {
        this._mnemonic = mnemonic;
    }

    /**
     * Returns a new random 24-word mnemonic from the BIP-39
     * standard English word list.
     *
     * @returns {Promise<Mnemonic>}
     */
    static async generate() {
        return new Mnemonic(await cryptography.Mnemonic._generate(24));
    }

    /**
     * Returns a new random 12-word mnemonic from the BIP-39
     * standard English word list.
     *
     * @returns {Promise<Mnemonic>}
     */
    static async generate12() {
        return new Mnemonic(await cryptography.Mnemonic._generate(12));
    }

    /**
     * Construct a mnemonic from a list of words. Handles 12, 22 (legacy), and 24 words.
     *
     * An exception of BadMnemonicError will be thrown if the mnemonic
     * contains unknown words or fails the checksum. An invalid mnemonic
     * can still be used to create private keys, the exception will
     * contain the failing mnemonic in case you wish to ignore the
     * validation error and continue.
     *
     * @param {string[]} words
     * @throws {cryptography.BadMnemonicError}
     * @returns {Promise<Mnemonic>}
     */
    static async fromWords(words) {
        return new Mnemonic(await cryptography.Mnemonic.fromWords(words));
    }

    /**
     * @deprecated - Use `toStandardEd25519PrivateKey()` or `toStandardECDSAsecp256k1PrivateKey()` instead
     * Recover a private key from this mnemonic phrase, with an
     * optional passphrase.
     * @param {string} [passphrase]
     * @returns {Promise<PrivateKey>}
     */
    async toPrivateKey(passphrase = "") {
        return CACHE.privateKeyConstructor(
            // eslint-disable-next-line deprecation/deprecation
            await this._mnemonic.toPrivateKey(passphrase)
        );
    }

    /**
     * @deprecated - Use `toStandardEd25519PrivateKey()` or `toStandardECDSAsecp256k1PrivateKey()` instead
     * Recover an Ed25519 private key from this mnemonic phrase, with an
     * optional passphrase.
     * @param {string} [passphrase]
     * @param {number[]} [path]
     * @returns {Promise<PrivateKey>}
     */
    async toEd25519PrivateKey(passphrase = "", path) {
        return CACHE.privateKeyConstructor(
            // eslint-disable-next-line deprecation/deprecation
            await this._mnemonic.toEd25519PrivateKey(passphrase, path)
        );
    }

    /**
     * Recover an Ed25519 private key from this mnemonic phrase, with an
     * optional passphrase.
     *
     * @param {string} [passphrase]
     * @param {number} [index]
     * @returns {Promise<PrivateKey>}
     */
    async toStandardEd25519PrivateKey(passphrase = "", index) {
        return CACHE.privateKeyConstructor(
            await this._mnemonic.toStandardEd25519PrivateKey(passphrase, index)
        );
    }

    /**
     * @deprecated - Use `toStandardEd25519PrivateKey()` or `toStandardECDSAsecp256k1PrivateKey()` instead
     * Recover an ECDSA private key from this mnemonic phrase, with an
     * optional passphrase.
     * @param {string} [passphrase]
     * @param {number[]} [path]
     * @returns {Promise<PrivateKey>}
     */
    async toEcdsaPrivateKey(passphrase = "", path) {
        return CACHE.privateKeyConstructor(
            // eslint-disable-next-line deprecation/deprecation
            await this._mnemonic.toEcdsaPrivateKey(passphrase, path)
        );
    }

    /**
     * Recover an ECDSA private key from this mnemonic phrase, with an
     * optional passphrase.
     *
     * @param {string} [passphrase]
     * @param {number} [index]
     * @returns {Promise<PrivateKey>}
     */
    async toStandardECDSAsecp256k1PrivateKey(passphrase = "", index) {
        return CACHE.privateKeyConstructor(
            await this._mnemonic.toStandardECDSAsecp256k1PrivateKey(
                passphrase,
                index
            )
        );
    }

    /**
     * Recover a mnemonic phrase from a string, splitting on spaces. Handles 12, 22 (legacy), and 24 words.
     *
     * @param {string} mnemonic
     * @returns {Promise<Mnemonic>}
     */
    static async fromString(mnemonic) {
        return new Mnemonic(await cryptography.Mnemonic.fromString(mnemonic));
    }

    /**
     * @returns {Promise<PrivateKey>}
     */
    async toLegacyPrivateKey() {
        return CACHE.privateKeyConstructor(
            await this._mnemonic.toLegacyPrivateKey()
        );
    }

    /**
     * @param {string} passphrase
     * @returns {Promise<Uint8Array>}
     */
    async toSeed(passphrase) {
        return await cryptography.Mnemonic.toSeed(
            this._mnemonic.words,
            passphrase
        );
    }

    /**
     * @returns {string}
     */
    toString() {
        return this._mnemonic.toString();
    }
}
