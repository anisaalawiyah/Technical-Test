package com.javaproject.anisa.configurations;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.servers.Server;

@Configuration
public class OpenAPi {

        @Bean
        public OpenAPI openAPI() {

                Server server = new Server()
                                .url("http://localhost:8080")
                                .description("technical test");

                

                License license = new License()
                                .name("MIT Licensi")
                                .url("http://www.mit-test.com");

                Info info = new Info()
                                .title("anisa")
                                .version("1.0")
                                .description("technical test")
                                .termsOfService("tos")
                                .license(license)
                                .summary("technical test");
                SecurityScheme securityScheme = new SecurityScheme().type(SecurityScheme.Type.HTTP)
                                .bearerFormat("JWT")
                                .scheme("bearer");

                return new OpenAPI().components(
                                new Components().addSecuritySchemes("Bearer Authentication", securityScheme)).info(info)
                                .servers(List.of(server));
        }
}
