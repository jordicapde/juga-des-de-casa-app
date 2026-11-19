<script setup>
import { ref } from 'vue';

const codi = ref('');

const pistaTypes = [
    { index: 0, text: '{X} {OP} {N}' },
    { index: 1, text: '{X} és {OP}' },
    { index: 2, text: '{X} és {OP} que els altres' },
    { index: 3, text: '{X} {OP} {Y}' },
    { index: 4, text: '{X} + {Y} {OP} {N}' },
    { index: 5, text: '{X} + {Y} + {Z} {OP} {N}' },
    { index: 6, text: '{X} + {Y} + {Z} és {OP}' },
    { index: 7, text: 'Hi ha més {OP1} que {OP2}' },
    { index: 8, text: 'No hi ha cap {OP}' },
    { index: 9, text: 'Hi ha un {OP}' },
    { index: 10, text: 'Hi ha {N} {OP}' },
    { index: 11, text: 'No hi ha cap {N}' },
    { index: 12, text: 'Hi ha {N1} {N}' },
    { index: 13, text: 'Hi ha un nombre repetit' },
    { index: 14, text: 'No hi ha cap nombre repetit' },
    { index: 15, text: 'Els nombres estan en ordre {OP}' },
    { index: 16, text: 'Els nombres no tenen ordre' }
];

const symbols = [
    { label: 'Triangle', value: 'triangle' },
    { label: 'Quadrat', value: 'quadrat' },
    { label: 'Rodona', value: 'rodona' }
];

const pistaFields = {
    0: [
        { key: 'X', label: 'Símbol X', options: symbols },
        { key: 'OP', label: 'Operador', options: ['<', '=', '>'] },
        { key: 'N', label: 'Número', type: 'text' }
    ],
    1: [
        { key: 'X', label: 'Símbol X', options: symbols },
        { key: 'OP', label: 'Operador', options: ['senar', 'parell'] }
    ],
    2: [
        { key: 'X', label: 'Símbol X', options: symbols },
        { key: 'OP', label: 'Operador', options: ['menor', 'major'] }
    ],
    3: [
        { key: 'X', label: 'Símbol X', options: symbols },
        { key: 'OP', label: 'Operador', options: ['<', '=', '>'] },
        { key: 'Y', label: 'Símbol Y', options: symbols }
    ],
    4: [
        { key: 'X', label: 'Símbol X', options: symbols },
        { key: 'Y', label: 'Símbol Y', options: symbols },
        { key: 'OP', label: 'Operador', options: ['<', '=', '>'] },
        { key: 'N', label: 'Número', type: 'text' }
    ],
    5: [
        { key: 'OP', label: 'Operador', options: ['<', '=', '>'] },
        { key: 'N', label: 'Número', type: 'text' }
    ],
    6: [
        { key: 'OP', label: 'Operador', options: ['senar', 'parell'] }
    ],
    7: [
        { key: 'OP1', label: 'Primer tipus', options: ['senars', 'parells'] },
        { key: 'OP2', label: 'Segon tipus', options: ['senars', 'parells'] }
    ],
    8: [
        { key: 'OP', label: 'Operador', options: ['senar', 'parell'] }
    ],
    9: [
        { key: 'OP', label: 'Operador', options: ['senar', 'parell'] }
    ],
    10: [
        { key: 'N', label: 'Quantitat', options: ['dos', 'tres'] },
        { key: 'OP', label: 'Tipus', options: ['senars', 'parells'] }
    ],
    11: [
        { key: 'N', label: 'N', type: 'text' }
    ],
    12: [
        { key: 'N1', label: 'N1', type: 'text' },
        { key: 'N', label: 'N', options: ['un', 'dos', 'tres'] }
    ],
    15: [
        { key: 'OP', label: 'Ordre', options: ['ascendent', 'descendent'] }
    ]
};

function createPista() {
    return {
        pista_index: 0,
        X: '',
        Y: '',
        OP: '',
        N: '',
        OP1: '',
        OP2: '',
        N1: ''
    };
}

function updatePistaFields(pista) {
    const fields = pistaFields[pista.pista_index] || [];

    const allowedKeys = fields.map(field => field.key);

    Object.keys(pista).forEach(key => {
        if (key !== 'pista_index' && !allowedKeys.includes(key)) {
            delete pista[key];
        }
    });

    fields.forEach(field => {
        if (!(field.key in pista)) {
            pista[field.key] = '';
        }
    });
}

function addPista(list) {
    list.push(createPista());
}

function removePista(list, index) {
    list.splice(index, 1);
}

const pistes_correctes = ref([]);
const pistes_incorrectes = ref([]);

function getFields(pista) {
    return pistaFields[pista.pista_index] || [];
}

function buildConfig() {
    function preparePistes(list) {
        return list.map(pista => {
            const result = {
                pista_index: pista.pista_index
            };

            getFields(pista).forEach(field => {
                result[field.key] = pista[field.key];
            });

            return result;
        });
    }

    return {
        codi: codi.value,
        pistes_correctes: preparePistes(pistes_correctes.value),
        pistes_incorrectes: preparePistes(pistes_incorrectes.value)
    };
}

function getFileName() {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hour = String(now.getHours()).padStart(2, '0');
    const minute = String(now.getMinutes()).padStart(2, '0');

    return `${year}${month}${day}_${hour}${minute}.json`;
}

async function saveConfig() {
    try {
        // Seleccionar directament la carpeta config
        const configFolder = await window.showDirectoryPicker({
            mode: 'readwrite'
        });

        const fileName = getFileName();
        const config = buildConfig();
        const json = JSON.stringify(config, null, 4);

        // Crear el fitxer JSON dins de la carpeta seleccionada
        const fileHandle = await configFolder.getFileHandle(fileName, {
            create: true
        });

        const writable = await fileHandle.createWritable();
        await writable.write(json);
        await writable.close();

        alert('Configuració guardada correctament!');
    } catch (error) {
        if (error.name === 'AbortError') return;

        console.error(error);
        alert('Error en guardar la configuració: ' + error.message);
    }
}
</script>

<template>
    <main class="turing-machine">
        <h1>Turing Machine</h1>

        <section class="config-section">
            <h2>Solució</h2>

            <label>
                Codi
                <input v-model="codi" type="text">
            </label>
        </section>

        <section
            v-for="(list, listName) in {
                pistes_correctes: pistes_correctes,
                pistes_incorrectes: pistes_incorrectes
            }"
            :key="listName"
            class="config-section"
        >
            <h2>
                {{ listName === 'pistes_correctes' ? 'Pistes correctes' : 'Pistes incorrectes' }}
            </h2>

            <article
                v-for="(pista, index) in list"
                :key="index"
                class="pista-card"
            >
                <div class="pista-header">
                    <h3>Pista {{ index + 1 }}</h3>

                    <button
                        type="button"
                        class="remove-button"
                        @click="removePista(list, index)"
                    >
                        Eliminar
                    </button>
                </div>

                <label>
                    Tipus de pista
                    <select
                        v-model.number="pista.pista_index"
                        @change="updatePistaFields(pista)"
                    >
                        <option
                            v-for="type in pistaTypes"
                            :key="type.index"
                            :value="type.index"
                        >
                            {{ type.index }} — {{ type.text }}
                        </option>
                    </select>
                </label>

                <div class="pista-fields">
                    <label
                        v-for="field in getFields(pista)"
                        :key="field.key"
                    >
                        {{ field.label }}

                        <select
                            v-if="field.options"
                            v-model="pista[field.key]"
                        >
                            <option value="">Selecciona...</option>
                            <option
                                v-for="option in field.options"
                                :key="typeof option === 'string' ? option : option.value"
                                :value="typeof option === 'string' ? option : option.value"
                            >
                                {{ typeof option === 'string' ? option : option.label }}
                            </option>
                        </select>

                        <input
                            v-else
                            v-model="pista[field.key]"
                            type="text"
                        >
                    </label>
                </div>
            </article>

            <button
                type="button"
                class="add-button"
                @click="addPista(list)"
            >
                + Afegir pista
            </button>
        </section>

      <section class="save-section">
        <button
          type="button"
          class="save-button"
          @click="saveConfig"
        >
          Desar configuració
        </button>
      </section>
    </main>
</template>

<style scoped>
.turing-machine {
    max-width: 1100px;
    margin: 0 auto;
    padding: 40px 32px 60px;
}

h1 {
    font-size: 32px;
    margin-bottom: 40px;
}

.config-section {
    margin-bottom: 40px;
}

.config-section h2 {
    font-size: 22px;
    margin-bottom: 20px;
}

label {
    display: flex;
    flex-direction: column;
    gap: 8px;
    font-size: 14px;
    font-weight: 600;
}

input,
select {
    padding: 10px 12px;
    border: 1px solid #ccc;
    border-radius: 6px;
    background: white;
    font-size: 14px;
    min-width: 0;
}

.config-section > label {
    max-width: 300px;
}

.pista-card {
    padding: 20px;
    margin-bottom: 16px;
    border: 1px solid #ddd;
    border-radius: 8px;
}

.pista-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.pista-header h3 {
    margin: 0;
    font-size: 16px;
}

.pista-card > label {
    max-width: 500px;
}

.pista-fields {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 16px;
    margin-top: 20px;
}

.add-button,
.remove-button {
    padding: 9px 14px;
    border: 1px solid #ccc;
    border-radius: 6px;
    background: white;
    cursor: pointer;
    font-size: 14px;
}

.add-button:hover,
.remove-button:hover {
    background: #f3f3f3;
}

.remove-button {
    color: #a33;
}

@media (max-width: 600px) {
    .turing-machine {
        padding: 32px 20px;
    }
}

.save-section {
    margin-top: 40px;
    padding-top: 24px;
    border-top: 1px solid #ddd;
}

.save-button {
    padding: 12px 24px;
    border: none;
    border-radius: 6px;
    background: #333;
    color: white;
    font-size: 15px;
    cursor: pointer;
}

.save-button:hover {
    background: #555;
}
</style>
