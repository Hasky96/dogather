package com.dogather.pjtserver.common;

import com.dogather.pjtserver.jwt.JwtProvider;
import org.json.JSONObject;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.PrintWriter;

@Component
public class LoginInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        if (HttpMethod.OPTIONS.matches(request.getMethod())){
            return true;
        }
        String jwt = request.getHeader("jwt");
        String validationResult = JwtProvider.validateToken(jwt,request.getHeader("userId"));
        if(!validationResult.equals("잘못된 토큰")){
            return true;
        }else{

            if( "GET".equals(request.getMethod()) && (request.getRequestURI().contains("board") || request.getRequestURI().contains("group")) ) {
                return true;
            }
//            response.sendError(401,"다시 로그인해주세요");
            PrintWriter writer = response.getWriter();
            JSONObject json = new JSONObject();
            json.put("msg","relogin");
            writer.write(json.toString(4));
            writer.flush();
            writer.close();
            return false;
        }
    }
}
