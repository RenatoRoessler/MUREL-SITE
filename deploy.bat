@echo off
rem Deploy do site institucional da Murel no VPS da Hostinger: empacota o projeto, envia, faz o build de producao e reinicia o app.
rem Uso: deploy.bat   (precisa de tar, ssh e scp, que ja vem no Windows 11; o tar usado e sempre o do Windows,
rem porque o do Git Bash le "C:" como um servidor remoto)
rem O site roda no pm2 como "murel-site", na porta 3001 (o GIPE usa a 3000 e fica em app.murel.com.br).

setlocal
set "SERVIDOR=root@187.41.96.17"
set "CHAVE=%USERPROFILE%\.ssh\id_rsa_pessoal"
set "DESTINO=/var/www/murel-site"
set "PACOTE=%TEMP%\murel-site-deploy.tgz"
set "SSH_OPCOES=-i "%CHAVE%" -o IdentitiesOnly=yes"

cd /d "%~dp0"

echo [1/4] Empacotando o projeto...
"%SystemRoot%\System32\tar.exe" --exclude=node_modules --exclude=.next --exclude=.git --exclude=.env* --exclude=docs -czf "%PACOTE%" .
if errorlevel 1 goto erro

echo [2/4] Enviando para o servidor...
scp %SSH_OPCOES% "%PACOTE%" %SERVIDOR%:/tmp/murel-site-deploy.tgz
if errorlevel 1 goto erro

rem O .env.production so e criado na primeira vez: no servidor ele guarda tambem SMTP_USER e SMTP_PASSWORD
rem (formulario de contato), que o deploy nao envia nem apaga.
echo [3/4] Instalando dependencias e gerando o build de producao (leva alguns minutos)...
ssh %SSH_OPCOES% %SERVIDOR% "set -e; mkdir -p %DESTINO% && tar -xzf /tmp/murel-site-deploy.tgz -C %DESTINO% && rm /tmp/murel-site-deploy.tgz && cd %DESTINO% && ([ -f .env.production ] || printf 'NEXT_PUBLIC_APP_URL=https://app.murel.com.br\nNEXT_PUBLIC_SITE_URL=https://murel.com.br\nCONTATO_DESTINO=contato@murel.com.br\n' > .env.production) && npm ci && npm run build"
if errorlevel 1 goto erro

echo [4/4] Reiniciando o app...
ssh %SSH_OPCOES% %SERVIDOR% "(pm2 describe murel-site >/dev/null 2>&1 && pm2 restart murel-site --update-env) || pm2 start npm --name murel-site -- start -- -p 3001; pm2 save && sleep 4 && curl -s -o /dev/null -w 'status do site: %%{http_code}\n' http://127.0.0.1:3001/"
if errorlevel 1 goto erro

del "%PACOTE%" >nul 2>&1
echo.
echo Deploy concluido: https://murel.com.br
exit /b 0

:erro
echo.
echo [erro] O deploy falhou. Veja a mensagem acima e rode o script de novo depois de corrigir.
del "%PACOTE%" >nul 2>&1
exit /b 1
