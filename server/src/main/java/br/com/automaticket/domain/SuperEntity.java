package br.com.automaticket.domain;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;

@MappedSuperclass
@Data
public class SuperEntity implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "data_criacao")
    private LocalDateTime dataCriacao = LocalDateTime.now();

    @Column(name = "data_atualizacao")
    private LocalDateTime dataAtualizacao = LocalDateTime.now();
}
