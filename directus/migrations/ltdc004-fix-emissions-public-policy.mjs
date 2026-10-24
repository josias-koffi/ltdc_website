// Répare la lecture publique des émissions.
//
// Selon l'historique de la base Directus, l'accès anonyme peut être porté par
// une policy explicite ou par une permission dont `policy` vaut null. La
// migration ltdc003 ne gérait que le premier cas via directus_access. On prend
// aussi en compte la permission anonyme historique de `actualities`, collection
// dont l'accès public est utilisé et vérifié par le site.

const EMISSIONS_READ = {
  collection: 'emissions',
  action: 'read',
};

const publishedOnly = JSON.stringify({ status: { _eq: 'published' } });
const emptyValidation = JSON.stringify({});

const forPolicy = (query, policy) =>
  policy == null ? query.whereNull('policy') : query.where({ policy });

const getPublicPolicies = async (knex) => {
  const accessPolicies = await knex('directus_access')
    .whereNull('role')
    .whereNull('user')
    .select('policy');
  const policies = new Set(accessPolicies.map(({ policy }) => policy));

  // Les bases migrées depuis l'ancien modèle de rôles peuvent conserver la
  // permission anonyme avec une policy nulle.
  const legacyPublicPermission = await knex('directus_permissions')
    .where({ collection: 'actualities', action: 'read' })
    .whereNull('policy')
    .first('id');
  if (legacyPublicPermission) policies.add(null);

  // Filet de sécurité : actualities est publiquement lisible sur toutes les
  // installations LTDC. Si aucun mapping anonyme n'est identifiable, recopier
  // ses policies de lecture garantit le même niveau d'accès pour emissions.
  if (policies.size === 0) {
    const fallbackPolicies = await knex('directus_permissions')
      .where({ collection: 'actualities', action: 'read' })
      .distinct('policy');
    fallbackPolicies.forEach(({ policy }) => policies.add(policy));
  }

  return [...policies];
};

export async function up(knex) {
  if (!(await knex.schema.hasTable('emissions'))) return;

  const publicPolicies = await getPublicPolicies(knex);

  for (const policy of publicPolicies) {
    const existing = await forPolicy(
      knex('directus_permissions').where(EMISSIONS_READ),
      policy,
    ).first('id');

    const permission = {
      fields: '*',
      permissions: publishedOnly,
      validation: emptyValidation,
    };

    if (existing) {
      await knex('directus_permissions')
        .where({ id: existing.id })
        .update(permission);
    } else {
      await knex('directus_permissions').insert({
        ...EMISSIONS_READ,
        policy,
        ...permission,
      });
    }
  }
}

export async function down(knex) {
  if (!(await knex.schema.hasTable('emissions'))) return;

  const publicPolicies = await getPublicPolicies(knex);

  for (const policy of publicPolicies) {
    await forPolicy(
      knex('directus_permissions').where(EMISSIONS_READ),
      policy,
    ).delete();
  }
}
