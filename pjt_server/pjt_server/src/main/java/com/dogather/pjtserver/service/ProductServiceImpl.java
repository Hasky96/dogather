package com.dogather.pjtserver.service;

import com.dogather.pjtserver.dao.ProductDao;
import com.dogather.pjtserver.dto.ProductDto;
import com.dogather.pjtserver.dto.ProductOptionDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    ProductDao productDao;

    @Override // 그룹에 해당하는 제품 가져오기
    public List<ProductDto> products(int groupNo) {
        List<ProductDto> products = productDao.products(groupNo);
        return products;
    }

    @Override
    public void productRegister(ProductDto productDto) {
        productDao.register(productDto);
    }

    @Override
    public void productUpdate(ProductDto productDto) {
        productDao.update(productDto);
    }

    @Override
    public void productDelete(int productNo) {
        productDao.delete(productNo);
    }

    @Override
    public void addProductHistory(int productNo) {
        ProductDto productInfo = productDao.getProduct(productNo);
        productDao.addPriceHistory(productInfo);
    }

    @Override
    public void setOption(ProductOptionDto optionDto) {
        productDao.setOption(optionDto);
    }
}
