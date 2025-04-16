
const { exec } = require('child_process');
const { promisify } = require('util');
const execAsync = promisify(exec);
const fs = require('fs');
const path = require('path');
const { program } = require('commander');

program
  .requiredOption('-c, --cert <path>', 'Caminho para o certificado .der')
  .requiredOption('-a, --alias <alias>', 'Alias para o certificado na truststore')
  .requiredOption('-p, --password <password>', 'Senha para a truststore')
  .option('-o, --output <path>', 'Caminho para a truststore gerada', 'truststore.jks');

program.parse(process.argv);

const options = program.opts();

async function checkFileExists(filePath) {
  try {
    await fs.promises.access(filePath, fs.constants.F_OK);
    return true;
  } catch (err) {
    return false;
  }
}

async function generateTruststore({ cert, alias, password, output }) {
  try {
    const certExists = await checkFileExists(cert);
    if (!certExists) {
      console.error(`Erro: O certificado ${cert} não foi encontrado.`);
      process.exit(1);
    }

    const certPem = path.join(__dirname, 'cert.pem');

    console.log('Convertendo certificado DER para PEM...');
    await execAsync(`openssl x509 -inform der -in "${cert}" -out "${certPem}"`);
    console.log('Certificado convertido para PEM.');

    console.log('Importando certificado para truststore...');
    await execAsync(`keytool -importcert -noprompt -trustcacerts -alias "${alias}" -file "${certPem}" -keystore "${output}" -storepass "${password}"`);
    console.log(`Truststore criada com sucesso: ${output}`);

    await fs.promises.unlink(certPem);
    console.log('Arquivo temporário removido.');

  } catch (error) {
    console.error('Ocorreu um erro durante o processo:', error.stderr || error);
    process.exit(1);
  }
}

generateTruststore(options);
