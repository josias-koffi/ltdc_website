export const trierParCle = (tableau: any[], cle: string) => {
    // On crée une copie du tableau pour ne pas modifier l'original
    if (!tableau) return []
    const tableauTrie = [...tableau];

    // On trie le tableau en fonction de la valeur de la clé spécifiée
    tableauTrie?.sort((a, b) => {
        if (a[cle] < b[cle]) {
            return -1;
        }
        if (a[cle] > b[cle]) {
            return 1;
        }
        return 0;
    });

    return tableauTrie;
}
