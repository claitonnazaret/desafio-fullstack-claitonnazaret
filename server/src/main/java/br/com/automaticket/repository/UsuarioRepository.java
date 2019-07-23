package br.com.automaticket.repository;

import br.com.automaticket.domain.Usuario;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> , JpaSpecificationExecutor<Usuario> {

    Page<Usuario> findAllByOrderByDataAtualizacao(Pageable pageable);

}
