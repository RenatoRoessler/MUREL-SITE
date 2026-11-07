integração com o endpoint de planos
agora os planos vem do back

/api/v1/Plano

curl -X 'GET' \
 'http://localhost:5000/api/v1/Plano' \
 -H 'accept: _/_'

[
{
"planoAdesaoId": 1,
"plano": "TESTE GRATUITO",
"tipoPeriodoPlano": 0,
"tipoPeriodoPlanoDescricao": "Trial",
"validadeDuracaoMeses": 1,
"valor": 0,
"valorPromocional": null,
"diferencaPercentual": null,
"promocaoInicio": null,
"promocaoFim": null,
"emPromocao": false,
"valorAtual": 0,
"ordemExibicao": 1
},
{
"planoAdesaoId": 2,
"plano": "MENSAL",
"tipoPeriodoPlano": 1,
"tipoPeriodoPlanoDescricao": "Mensal",
"validadeDuracaoMeses": 1,
"valor": 99.9,
"valorPromocional": 69.9,
"diferencaPercentual": null,
"promocaoInicio": "2026-11-01T00:00:00",
"promocaoFim": "2027-06-30T00:00:00",
"emPromocao": true,
"valorAtual": 69.9,
"ordemExibicao": 2
}
]
