package com.dogather.pjtserver.config;

import com.dogather.pjtserver.common.LoginInterceptor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    //CORS SETTING!
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("*")//), "http://127.0.0.1:5500/")// 나중에 변경해야함 일단은 모두에게서 허용
                .allowedMethods("*");
    }

//    @Override
//    public void addInterceptors(InterceptorRegistry registry){
//        registry.addInterceptor(new LoginInterceptor())
//                .addPathPatterns("/**")
//                .excludePathPatterns(
//                        "/",
//                        "/*",
//                        "/user/register",
//                        "/user/login",
//                        "/user/idcheck",
//                        "/user/nickcheck",
//                        "/err/msg",
//                        "/group/wsearch",
//                        "/group/csearch/*",
//                        "/group/psearch",
//                        "/group/detail/**",
//                        "/group/list"
//                );
//    }

}
