package br.com.automaticket.resource;


import br.com.automaticket.domain.Usuario;
import br.com.automaticket.service.UsuarioService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;

@RestController
@RequestMapping("/api/usuario")
public class UsuarioResouce {

    private final UsuarioService usuarioService;

    public UsuarioResouce(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @GetMapping("/listAll")
    public ResponseEntity<Page<Usuario>> listAll(@RequestParam(value = "search") String search, Pageable pageable) {
        return ResponseEntity.ok(usuarioService.listAll(search, pageable));
    }

    @GetMapping("/listOne/{id}")
    public ResponseEntity<Usuario> listOne(@PathVariable Long id) {
        Usuario usuario = usuarioService.findOne(id);
        if(Objects.isNull(usuario))
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        return ResponseEntity.ok(usuarioService.findOne(id));
    }

    @PostMapping(path = "/", consumes = "application/json", produces = "application/json")
    public ResponseEntity<Usuario> save(@RequestBody Usuario usuario) {
        return ResponseEntity.ok(usuarioService.save(usuario));
    }

    @DeleteMapping("/{idUsuario}")
    public void delete(@PathVariable Long idUsuario) {
        usuarioService.delete(idUsuario);
    }
}
