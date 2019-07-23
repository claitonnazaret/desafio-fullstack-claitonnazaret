package br.com.automaticket.service;

import br.com.automaticket.domain.Usuario;
import br.com.automaticket.repository.UsuarioRepository;
import br.com.automaticket.rsql.CustomRsqlVisitor;
import cz.jirutka.rsql.parser.RSQLParser;
import cz.jirutka.rsql.parser.ast.Node;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.Optional;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;

    public UsuarioService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    public Page<Usuario> listAll(String search, Pageable pageable) {
        if(StringUtils.isNotBlank(search)){
            Node rootNode = new RSQLParser().parse(search);
            Specification<Usuario> spec = rootNode.accept(new CustomRsqlVisitor<>());
            return usuarioRepository.findAll(spec, pageable);
        }
        return usuarioRepository.findAll(pageable);
    }

    public Usuario save(Usuario usuario) {
        usuario.setDataAtualizacao(LocalDateTime.now());
        return usuarioRepository.save(usuario);
    }

    public void delete(Long idUsuario) {
        Optional<Usuario> usuario = usuarioRepository.findById(idUsuario);

        usuario.ifPresent(usuarioRepository::delete);
    }

    public Usuario findOne(Long id) {
        Optional<Usuario> usuario = usuarioRepository.findById(id);
        return usuario.orElse(null);
    }
}
