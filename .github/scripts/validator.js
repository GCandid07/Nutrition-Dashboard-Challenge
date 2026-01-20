
/**
 * Valida se o autor do PR tem permissão para submeter.
 * Se o repositório for público, rejeita PRs de não-mantenedores para forçar o fluxo de Fork.
 * 
 * @param {object} params
 * @param {import('@actions/github/lib/utils').GitHub} params.github
 * @param {import('@actions/github/lib/context').Context} params.context
 * @param {import('@actions/core')} params.core
 */
module.exports.validateSubmission = async function validateSubmission({ github, context, core }) {
  const { actor, repo } = context;
  const prNumber = context.payload.pull_request?.number;

  if (!prNumber) {
    core.setFailed('Evento não é um Pull Request.');
    return;
  }

  try {
    const { data: permissionData } = await github.rest.repos.getCollaboratorPermissionLevel({
      owner: repo.owner,
      repo: repo.repo,
      username: actor,
    });

    const permission = permissionData.permission;
    const allowedRoles = ['admin', 'maintain'];


    if (!allowedRoles.includes(permission)) {

      await github.rest.issues.createComment({
        owner: repo.owner,
        repo: repo.repo,
        issue_number: prNumber,
        body: `
### 🚫 Submissão Inválida

Olá @${actor}! Obrigado pelo interesse.

Este repositório é apenas para leitura e distribuição do teste.
Por favor, siga o fluxo correto:
1. Faça um **Fork** deste repositório.
2. Desenvolva sua solução no seu Fork.
3. Envie o link do seu repositório para a equipe de recrutamento.

**Este Pull Request será fechado automaticamente.**
        `
      });

      await github.rest.pulls.update({
        owner: repo.owner,
        repo: repo.repo,
        pull_number: prNumber,
        state: 'closed',
      });

      core.setFailed(`PR fechado: Usuário ${actor} não tem permissão de mantenedor.`);
    } else {
      core.info(`Usuário ${actor} autorizado.`);
    }

  } catch (error) {
    core.setFailed(`Erro ao validar permissões: ${(error.message)}`);
  }
};
