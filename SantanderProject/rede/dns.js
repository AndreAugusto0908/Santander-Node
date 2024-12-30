/* eslint-disable @typescript-eslint/no-require-imports */
const dns = require('node:dns');

const urlConsultada = 'google.com';

dns.resolve4(urlConsultada, (err, addresses) => {
    if (err) {
        console.log('URL não encontrada');
        return;
    }
    console.log(addresses);
});

console.log("---------------------");

async function consultaIpv4() {
    try {
        console.time('Pesquisando URL por DNS padrão');
        const ipv4google = await dns.promises.resolve4(urlConsultada);
        console.timeEnd('Pesquisando URL por DNS padrão');

        console.log('Endereços IPv4:', ipv4google);

        const nameServers = await dns.promises.resolveNs(urlConsultada);
        console.log('Servidores de nome:', nameServers);

        // Resolva o IP de um dos servidores de nome
        const ipns = await dns.promises.resolve4(nameServers[1]); // Resolve ns2.google.com para IPv4
        console.log(`IP do servidor de nome (${nameServers[1]}):`, ipns);

        const resolver = new dns.Resolver();
        resolver.setServers(ipns); // Configura o servidor DNS para o resolvedor

        console.time('Pesquisando URL por DNS específico');
        resolver.resolve4(urlConsultada, (error, addresses) => {
            if (error) {
                console.error('Erro ao consultar DNS específico:', error);
                return;
            }
            console.timeEnd('Pesquisando URL por DNS específico');
            console.log('Endereços IPv4 pelo DNS específico:', addresses);
        });
    } catch (error) {
        console.error('Erro geral:', error);
    }
}

consultaIpv4();
