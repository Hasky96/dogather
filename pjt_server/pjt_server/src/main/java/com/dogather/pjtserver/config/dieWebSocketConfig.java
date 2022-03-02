package com.dogather.pjtserver.config;

import com.dogather.pjtserver.handler.ChatHandler;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;


@Slf4j
@Configuration
@RequiredArgsConstructor
@EnableWebSocket
public class dieWebSocketConfig implements WebSocketConfigurer {

    private final ChatHandler webSocketHandler;

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(webSocketHandler, "/ws/chat").setAllowedOrigins("*");
    }

    // Stomp 시작
}
