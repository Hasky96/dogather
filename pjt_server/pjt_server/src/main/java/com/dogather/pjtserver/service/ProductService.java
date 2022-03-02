package com.dogather.pjtserver.service;


import com.dogather.pjtserver.dto.ProductDto;
import com.dogather.pjtserver.dto.ProductOptionDto;

import java.util.List;

public interface ProductService {

    public List<ProductDto> products(int groupNo);
    public void productRegister(ProductDto productDto);
    public void productUpdate(ProductDto productDto);
    public void productDelete(int productNo);
    public void addProductHistory(int productNo);
    public void setOption(ProductOptionDto optionDto);

}
