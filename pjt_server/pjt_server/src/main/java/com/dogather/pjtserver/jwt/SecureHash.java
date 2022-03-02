package com.dogather.pjtserver.jwt;

import java.math.BigInteger;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class SecureHash {

    public static String hashing256(String word) throws NoSuchAlgorithmException {
        MessageDigest md = MessageDigest.getInstance("SHA-256");
        md.update(word.getBytes(StandardCharsets.UTF_8));
        String hex = String.format("%064x", new BigInteger(1, md.digest()));
        return hex;
    }
}
