package br.com.automaticket.domain;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.Column;
import javax.persistence.Entity;
import java.io.Serializable;

@Entity
@Data
@EqualsAndHashCode(callSuper = false)
public class Usuario extends SuperEntity implements Serializable {

    @Column(nullable = false, name = "nome_completo")
    private String nomeCompleto;

    @Column(nullable = false)
    private String cpf;

    private String telefone;

    @Column(name = "nome_mae")
    private String nomeMae;

    @Column(name = "nome_pai")
    private String nomePai;

    private String cep;

    @Column(nullable = false)
    private String logradouro;

    private String numero;

    private String complemento;

    @Column(nullable = false)
    private String bairro;

    @Column(nullable = false)
    private String localidade;

    @Column(nullable = false)
    private String uf;

    private String ibge;
}
