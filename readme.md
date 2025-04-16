# Gerador de Keystore

Este é um simples gerador de keystore (`.keystore` ou `.jks`) que permite recuperar sua chave caso ela tenha sido perdida através do arquivo de certificado (`.cert`) baixado da Google Play Console.

## Como obter o certificado

1. Acesse a [Google Play Console](https://play.google.com/console)
2. Vá em **Configurações** > **Assinaturas de apps**
3. Clique em **Baixar certificado**
4. Salve o arquivo como `upload_cert.der`

## Como usar

Após obter o certificado, execute o seguinte comando:

```bash
node index.js \
  --cert upload_cert.der \
  --alias alias_do_keystore \
  --password senha_do_keystore \
  --output nome_do_arquivo.keystore
```

ou para gerar um arquivo `.jks`:

```bash
node index.js \
  --cert upload_cert.der \
  --alias alias_do_keystore \
  --password senha_do_keystore \
  --output nome_do_arquivo.jks
```

## Parâmetros

- `--cert`: Caminho para o arquivo de certificado `.der` baixado da Google Play Console
- `--alias`: Alias que será usado para a entrada na keystore
- `--password`: Senha que será usada para proteger a keystore
- `--output`: Nome do arquivo de saída (pode ser `.keystore` ou `.jks`)

## Exemplo

```bash
node index.js \
  --cert upload_cert.der \
  --alias burdog-olga \
  --password 12345678 \
  --output burdog-olga.keystore
```

## Requisitos

- Node.js instalado
- Java instalado (para usar o keytool)
