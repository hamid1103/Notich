import 'dotenv/config'
import {ChatOpenAI} from "@langchain/openai";

let model = new ChatOpenAI({
    azureOpenAIApiKey: process.env.AZURE_OPENAI_API_KEY,
    azureOpenAIApiVersion: process.env.OPENAI_API_VERSION,
    azureOpenAIApiInstanceName: process.env.INSTANCE_NAME,
    azureOpenAIApiDeploymentName: process.env.ENGINE_NAME,
})

let loadString = ""
let stringAnswer = ""

const stream = await model.stream("Write an introduction for a children's book about a group of warriors.")
for await (const chunk of stream) {
    loadString += "-"
    console.log(loadString)
    stringAnswer += chunk.content;
}
//Seems this gets called after the stream. Good
console.log(stringAnswer)

/**
 * Output chunk.content:
 * Welcome
 *  to
 *  the
 *  world
 *  of
 *  the
 *  Warrior
 *  Squad
 * !
 *  This
 *  group
 *  of
 *  brave
 *  and
 *  strong
 *  warriors
 *  come
 *  together
 *  to
 *  protect
 *  their
 *  land
 *  from
 *  any
 *  danger
 *  that
 *  may
 *  arise
 * .
 *  Each
 *  warrior
 *  has
 *  their
 *  own
 *  unique
 *  skills
 * ,
 *  from
 *  wielding
 *  a
 *  sword
 *  to
 *  shooting
 *  a
 *  bow
 *  and
 *  arrow
 * .
 *  No
 *  obstacle
 *  is
 *  too
 *  great
 *  for
 *  the
 *  Warrior
 *  Squad
 * ,
 *  whether
 *  it
 *  be
 *  facing
 *  off
 *  against
 *  a
 *  fierce
 *  dragon
 *  or
 *  navigating
 *  through
 *  a
 *  tre
 * acher
 * ous
 *  forest
 * .
 *  Join
 *  them
 *  on
 *  their
 *  truly
 *  means
 *  to
 *  be
 *  a
 *  warrior
 * .
 */
/** Output chunk:
 * AIMessageChunk {
 *   lc_serializable: true,
 *   lc_kwargs: { content: '', additional_kwargs: {} },
 *   lc_namespace: [ 'langchain_core', 'messages' ],
 *   content: '',
 *   name: undefined,
 *   additional_kwargs: {}
 * }
 * AIMessageChunk {
 *   lc_serializable: true,
 *   lc_kwargs: { content: 'Once', additional_kwargs: {} },
 *   lc_namespace: [ 'langchain_core', 'messages' ],
 *   content: 'Once',
 *   name: undefined,
 *   additional_kwargs: {}
 * }
 * AIMessageChunk {
 *   lc_serializable: true,
 *   lc_kwargs: { content: ' upon', additional_kwargs: {} },
 *   lc_namespace: [ 'langchain_core', 'messages' ],
 *   content: ' upon',
 *   name: undefined,
 *   additional_kwargs: {}
 * }
 * AIMessageChunk {
 *   lc_serializable: true,
 *   lc_kwargs: { content: ' a', additional_kwargs: {} },
 *   lc_namespace: [ 'langchain_core', 'messages' ],
 *   content: ' a',
 *   name: undefined,
 *   additional_kwargs: {}
 * }
 * AIMessageChunk {
 *   lc_serializable: true,
 *   lc_kwargs: { content: ' time', additional_kwargs: {} },
 *   lc_namespace: [ 'langchain_core', 'messages' ],
 *   content: ' time',
 *   name: undefined,
 *   additional_kwargs: {}
 * }
 * AIMessageChunk {
 *   lc_serializable: true,
 *   lc_kwargs: { content: ',', additional_kwargs: {} },
 *   lc_namespace: [ 'langchain_core', 'messages' ],
 *   content: ',',
 *   name: undefined,
 *   additional_kwargs: {}
 * }
 * AIMessageChunk {
 *   lc_serializable: true,
 *   lc_kwargs: { content: ' there', additional_kwargs: {} },
 *   lc_namespace: [ 'langchain_core', 'messages' ],
 *   content: ' there',
 *   name: undefined,
 *   additional_kwargs: {}
 * }
 * AIMessageChunk {
 *   lc_serializable: true,
 *   lc_kwargs: { content: ' was', additional_kwargs: {} },
 *   lc_namespace: [ 'langchain_core', 'messages' ],
 *   content: ' was',
 *   name: undefined,
 *   additional_kwargs: {}
 * }
 * AIMessageChunk {
 *   lc_serializable: true,
 *   lc_kwargs: { content: ' a', additional_kwargs: {} },
 *   lc_namespace: [ 'langchain_core', 'messages' ],
 *   content: ' a',
 *   name: undefined,
 *   additional_kwargs: {}
 * }
 * AIMessageChunk {
 *   lc_serializable: true,
 *   lc_kwargs: { content: ' group', additional_kwargs: {} },
 *   lc_namespace: [ 'langchain_core', 'messages' ],
 *   content: ' group',
 *   name: undefined,
 *   additional_kwargs: {}
 * }
 * AIMessageChunk {
 *   lc_serializable: true,
 *   lc_kwargs: { content: ' of', additional_kwargs: {} },
 *   lc_namespace: [ 'langchain_core', 'messages' ],
 *   content: ' of',
 *   name: undefined,
 *   additional_kwargs: {}
 * }
 * AIMessageChunk {
 *   lc_serializable: true,
 *   lc_kwargs: { content: ' brave', additional_kwargs: {} },
 *   lc_namespace: [ 'langchain_core', 'messages' ],
 *   content: ' brave',
 *   name: undefined,
 *   additional_kwargs: {}
 * }
 * AIMessageChunk {
 *   lc_serializable: true,
 *   lc_kwargs: { content: ' warriors', additional_kwargs: {} },
 *   lc_namespace: [ 'langchain_core', 'messages' ],
 *   content: ' warriors',
 *   name: undefined,
 *   additional_kwargs: {}
 * }
 * AIMessageChunk {
 *   lc_serializable: true,
 *   lc_kwargs: { content: ' who', additional_kwargs: {} },
 *   lc_namespace: [ 'langchain_core', 'messages' ],
 *   content: ' who',
 *   name: undefined,
 *   additional_kwargs: {}
 * }
 * AIMessageChunk {
 *   lc_serializable: true,
 *   lc_kwargs: { content: ' set', additional_kwargs: {} },
 *   lc_namespace: [ 'langchain_core', 'messages' ],
 *   content: ' set',
 *   name: undefined,
 *   additional_kwargs: {}
 * }
 * AIMessageChunk {
 *   lc_serializable: true,
 *   lc_kwargs: { content: ' out', additional_kwargs: {} },
 *   lc_namespace: [ 'langchain_core', 'messages' ],
 *   content: ' out',
 *   name: undefined,
 *   additional_kwargs: {}
 * }
 * AIMessageChunk {
 *   lc_serializable: true,
 *   lc_kwargs: { content: ' on', additional_kwargs: {} },
 *   lc_namespace: [ 'langchain_core', 'messages' ],
 *   content: ' on',
 *   name: undefined,
 *   additional_kwargs: {}
 * }
 * AIMessageChunk {
 *   lc_serializable: true,
 *   lc_kwargs: { content: ' a', additional_kwargs: {} },
 *   lc_namespace: [ 'langchain_core', 'messages' ],
 *   content: ' a',
 *   name: undefined,
 *   additional_kwargs: {}
 * }
 * AIMessageChunk {
 *   lc_serializable: true,
 *   lc_kwargs: { content: ' quest', additional_kwargs: {} },
 *   lc_namespace: [ 'langchain_core', 'messages' ],
 *   content: ' quest',
 *   name: undefined,
 *   additional_kwargs: {}
 * }
 * AIMessageChunk {
 *   lc_serializable: true,
 *   lc_kwargs: { content: ' to', additional_kwargs: {} },
 *   lc_namespace: [ 'langchain_core', 'messages' ],
 *   content: ' to',
 *   name: undefined,
 *   additional_kwargs: {}
 * }
 * AIMessageChunk {
 *   lc_serializable: true,
 *   lc_kwargs: { content: ' save', additional_kwargs: {} },
 *   lc_namespace: [ 'langchain_core', 'messages' ],
 *   content: ' save',
 *   name: undefined,
 *   additional_kwargs: {}
 * }
 * AIMessageChunk {
 *   lc_serializable: true,
 *   lc_kwargs: { content: ' their', additional_kwargs: {} },
 *   lc_namespace: [ 'langchain_core', 'messages' ],
 *   content: ' their',
 *   name: undefined,
 *   additional_kwargs: {}
 * }
 * AIMessageChunk {
 *   lc_serializable: true,
 *   lc_kwargs: { content: ' kingdom', additional_kwargs: {} },
 *   lc_namespace: [ 'langchain_core', 'messages' ],
 *   content: ' kingdom',
 *   name: undefined,
 *   additional_kwargs: {}
 * }
 * AIMessageChunk {
 *   lc_serializable: true,
 *   lc_kwargs: { content: ' from', additional_kwargs: {} },
 *   lc_namespace: [ 'langchain_core', 'messages' ],
 *   content: ' from',
 *   name: undefined,
 *   additional_kwargs: {}
 * }
 * AIMessageChunk {
 *   lc_serializable: true,
 *   lc_kwargs: { content: ' impending', additional_kwargs: {} },
 *   lc_namespace: [ 'langchain_core', 'messages' ],
 *   content: ' impending',
 *   name: undefined,
 *   additional_kwargs: {}
 * }
 * AIMessageChunk {
 *   lc_serializable: true,
 *   lc_kwargs: { content: ' doom', additional_kwargs: {} },
 *   lc_namespace: [ 'langchain_core', 'messages' ],
 *   content: ' doom',
 *   name: undefined,
 *   additional_kwargs: {}
 * }
 * AIMessageChunk {
 *   lc_serializable: true,
 *   lc_kwargs: { content: '.', additional_kwargs: {} },
 *   lc_namespace: [ 'langchain_core', 'messages' ],
 *   content: '.',
 *   name: undefined,
 *   additional_kwargs: {}
 * }
 * AIMessageChunk {
 *   lc_serializable: true,
 *   lc_kwargs: { content: ' These', additional_kwargs: {} },
 *   lc_namespace: [ 'langchain_core', 'messages' ],
 *   content: ' These',
 *   name: undefined,
 *   additional_kwargs: {}
 * }
 * AIMessageChunk {
 *   lc_serializable: true,
 *   lc_kwargs: { content: ' warriors', additional_kwargs: {} },
 *   lc_namespace: [ 'langchain_core', 'messages' ],
 *   content: ' warriors',
 *   name: undefined,
 *   additional_kwargs: {}
 * }
 * AIMessageChunk {
 *   lc_serializable: true,
 *   lc_kwargs: { content: ' were', additional_kwargs: {} },
 *   lc_namespace: [ 'langchain_core', 'messages' ],
 *   content: ' were',
 *   name: undefined,
 *   additional_kwargs: {}
 * }
 * AIMessageChunk {
 *   lc_serializable: true,
 *   lc_kwargs: { content: ' not', additional_kwargs: {} },
 *   lc_namespace: [ 'langchain_core', 'messages' ],
 *   content: ' not',
 *   name: undefined,
 *   additional_kwargs: {}
 * }
 * AIMessageChunk {
 *   lc_serializable: true,
 *   lc_kwargs: { content: ' only', additional_kwargs: {} },
 *   lc_namespace: [ 'langchain_core', 'messages' ],
 *   content: ' only',
 *   name: undefined,
 *   additional_kwargs: {}
 * }
 * AIMessageChunk {
 *   lc_serializable: true,
 *   lc_kwargs: { content: ' skilled', additional_kwargs: {} },
 *   lc_namespace: [ 'langchain_core', 'messages' ],
 *   content: ' skilled',
 *   name: undefined,
 *   additional_kwargs: {}
 * }
 * AIMessageChunk {
 *   lc_serializable: true,
 *   lc_kwargs: { content: ' in', additional_kwargs: {} },
 *   lc_namespace: [ 'langchain_core', 'messages' ],
 *   content: ' in',
 *   name: undefined,
 *   additional_kwargs: {}
 * }
 * AIMessageChunk {
 *   lc_serializable: true,
 *   lc_kwargs: { content: ' battle', additional_kwargs: {} },
 *   lc_namespace: [ 'langchain_core', 'messages' ],
 *   content: ' battle',
 *   name: undefined,
 *   additional_kwargs: {}
 * }
 * AIMessageChunk {
 *   lc_serializable: true,
 *   lc_kwargs: { content: ',', additional_kwargs: {} },
 *   lc_namespace: [ 'langchain_core', 'messages' ],
 *   content: ',',
 *   name: undefined,
 *   additional_kwargs: {}
 * }
 * AIMessageChunk {
 *   lc_serializable: true,
 *   lc_kwargs: { content: ' but', additional_kwargs: {} },
 *   lc_namespace: [ 'langchain_core', 'messages' ],
 *   content: ' but',
 *   name: undefined,
 *   additional_kwargs: {}
 * }
 * AIMessageChunk {
 *   lc_serializable: true,
 *   lc_kwargs: { content: ' also', additional_kwargs: {} },
 *   lc_namespace: [ 'langchain_core', 'messages' ],
 *   content: ' also',
 *   name: undefined,
 *   additional_kwargs: {}
 * }
 * AIMessageChunk {
 *   lc_serializable: true,
 *   lc_kwargs: { content: ' possessed', additional_kwargs: {} },
 *   lc_namespace: [ 'langchain_core', 'messages' ],
 *   content: ' possessed',
 *   name: undefined,
 *   additional_kwargs: {}
 * }
 * AIMessageChunk {
 *   lc_serializable: true,
 *   lc_kwargs: { content: ' unique', additional_kwargs: {} },
 *   lc_namespace: [ 'langchain_core', 'messages' ],
 *   content: ' unique',
 *   name: undefined,
 *   additional_kwargs: {}
 * }
 * AIMessageChunk {
 *   lc_serializable: true,
 *   lc_kwargs: { content: ' talents', additional_kwargs: {} },
 *   lc_namespace: [ 'langchain_core', 'messages' ],
 *   content: ' talents',
 *   name: undefined,
 *   additional_kwargs: {}
 * }
 * AIMessageChunk {
 *   lc_serializable: true,
 *   lc_kwargs: { content: ' and', additional_kwargs: {} },
 *   lc_namespace: [ 'langchain_core', 'messages' ],
 *   content: ' and',
 *   name: undefined,
 *   additional_kwargs: {}
 * }
 * AIMessageChunk {
 *   lc_serializable: true,
 *   lc_kwargs: { content: ' strengths', additional_kwargs: {} },
 *   lc_namespace: [ 'langchain_core', 'messages' ],
 *   content: ' strengths',
 *   name: undefined,
 *   additional_kwargs: {}
 * }
 * AIMessageChunk {
 *   lc_serializable: true,
 *   lc_kwargs: { content: ' that', additional_kwargs: {} },
 *   lc_namespace: [ 'langchain_core', 'messages' ],
 *   content: ' that',
 *   name: undefined,
 *   additional_kwargs: {}
 * }
 * AIMessageChunk {
 *   lc_serializable: true,
 *   lc_kwargs: { content: ' would', additional_kwargs: {} },
 *   lc_namespace: [ 'langchain_core', 'messages' ],
 *   content: ' would',
 *   name: undefined,
 *   additional_kwargs: {}
 * }
 * AIMessageChunk {
 *   lc_serializable: true,
 *   lc_kwargs: { content: ' aid', additional_kwargs: {} },
 *   lc_namespace: [ 'langchain_core', 'messages' ],
 *   content: ' aid',
 *   name: undefined,
 *   additional_kwargs: {}
 * }
 * AIMessageChunk {
 *   lc_serializable: true,
 *   lc_kwargs: { content: ' them', additional_kwargs: {} },
 *   lc_namespace: [ 'langchain_core', 'messages' ],
 *   content: ' them',
 *   name: undefined,
 *   additional_kwargs: {}
 * }
 * AIMessageChunk {
 *   lc_serializable: true,
 *   lc_kwargs: { content: ' in', additional_kwargs: {} },
 *   lc_namespace: [ 'langchain_core', 'messages' ],
 *   content: ' in',
 *   name: undefined,
 *   additional_kwargs: {}
 * }
 * AIMessageChunk {
 *   lc_serializable: true,
 *   lc_kwargs: { content: ' their', additional_kwargs: {} },
 *   lc_namespace: [ 'langchain_core', 'messages' ],
 *   content: ' their',
 *   name: undefined,
 *   additional_kwargs: {}
 * }
 * AIMessageChunk {
 *   lc_serializable: true,
 *   lc_kwargs: { content: ' journey', additional_kwargs: {} },
 *   lc_namespace: [ 'langchain_core', 'messages' ],
 *   content: ' journey',
 *   name: undefined,
 *   additional_kwargs: {}
 * }
 * AIMessageChunk {
 *   lc_serializable: true,
 *   lc_kwargs: { content: '.', additional_kwargs: {} },
 *   lc_namespace: [ 'langchain_core', 'messages' ],
 *   content: '.',
 *   name: undefined,
 *   additional_kwargs: {}
 * }
 * AIMessageChunk {
 *   lc_serializable: true,
 *   lc_kwargs: { content: ' With', additional_kwargs: {} },
 *   lc_namespace: [ 'langchain_core', 'messages' ],
 *   content: ' With',
 *   name: undefined,
 *   additional_kwargs: {}
 * }
 * AIMessageChunk {
 *   lc_serializable: true,
 *   lc_kwargs: { content: ' their', additional_kwargs: {} },
 *   lc_namespace: [ 'langchain_core', 'messages' ],
 *   content: ' their',
 *   name: undefined,
 *   additional_kwargs: {}
 * }
 * AIMessageChunk {
 *   lc_serializable: true,
 *   lc_kwargs: { content: ' unw', additional_kwargs: {} },
 *   lc_namespace: [ 'langchain_core', 'messages' ],
 *   content: ' unw',
 *   name: undefined,
 *   additional_kwargs: {}
 * }
 * AIMessageChunk {
 *   lc_serializable: true,
 *   lc_kwargs: { content: 'av', additional_kwargs: {} },
 *   lc_namespace: [ 'langchain_core', 'messages' ],
 *   content: 'av',
 *   name: undefined,
 *   additional_kwargs: {}
 * }
 * AIMessageChunk {
 *   lc_serializable: true,
 *   lc_kwargs: { content: 'ering', additional_kwargs: {} },
 *   lc_namespace: [ 'langchain_core', 'messages' ],
 *   content: 'ering',
 *   name: undefined,
 *   additional_kwargs: {}
 * }
 * AIMessageChunk {
 *   lc_serializable: true,
 *   lc_kwargs: { content: ' courage', additional_kwargs: {} },
 *   lc_namespace: [ 'langchain_core', 'messages' ],
 *   content: ' courage',
 *   name: undefined,
 *   additional_kwargs: {}
 * }
 * AIMessageChunk {
 *   lc_serializable: true,
 *   lc_kwargs: { content: ',', additional_kwargs: {} },
 *   lc_namespace: [ 'langchain_core', 'messages' ],
 *   content: ',',
 *   name: undefined,
 *   additional_kwargs: {}
 * }
 * AIMessageChunk {
 *   lc_serializable: true,
 *   lc_kwargs: { content: ' unw', additional_kwargs: {} },
 *   lc_namespace: [ 'langchain_core', 'messages' ],
 *   content: ' unw',
 *   name: undefined,
 *   additional_kwargs: {}
 * }
 * AIMessageChunk {
 *   lc_serializable: true,
 *   lc_kwargs: { content: 'av', additional_kwargs: {} },
 *   lc_namespace: [ 'langchain_core', 'messages' ],
 *   content: 'av',
 *   name: undefined,
 *   additional_kwargs: {}
 * }
 * AIMessageChunk {
 *   lc_serializable: true,
 *   lc_kwargs: { content: 'ering', additional_kwargs: {} },
 *   lc_namespace: [ 'langchain_core', 'messages' ],
 *   content: 'ering',
 *   name: undefined,
 *   additional_kwargs: {}
 * }
 * AIMessageChunk {
 *   lc_serializable: true,
 *   lc_kwargs: { content: ' teamwork', additional_kwargs: {} },
 *   lc_namespace: [ 'langchain_core', 'messages' ],
 *   content: ' teamwork',
 *   name: undefined,
 *   additional_kwargs: {}
 * }
 * AIMessageChunk {
 *   lc_serializable: true,
 *   lc_kwargs: { content: ' and', additional_kwargs: {} },
 *   lc_namespace: [ 'langchain_core', 'messages' ],
 *   content: ' and',
 *   name: undefined,
 *   additional_kwargs: {}
 * }
 * AIMessageChunk {
 *   lc_serializable: true,
 *   lc_kwargs: { content: ' un', additional_kwargs: {} },
 *   lc_namespace: [ 'langchain_core', 'messages' ],
 *   content: ' un',
 *   name: undefined,
 *   additional_kwargs: {}
 * }
 * AIMessageChunk {
 *   lc_serializable: true,
 *   lc_kwargs: { content: 'break', additional_kwargs: {} },
 *   lc_namespace: [ 'langchain_core', 'messages' ],
 *   content: 'break',
 *   name: undefined,
 *   additional_kwargs: {}
 * }
 * AIMessageChunk {
 *   lc_serializable: true,
 *   lc_kwargs: { content: 'able', additional_kwargs: {} },
 *   lc_namespace: [ 'langchain_core', 'messages' ],
 *   content: 'able',
 *   name: undefined,
 *   additional_kwargs: {}
 * }
 * AIMessageChunk {
 *   lc_serializable: true,
 *   lc_kwargs: { content: ' spirit', additional_kwargs: {} },
 *   lc_namespace: [ 'langchain_core', 'messages' ],
 *   content: ' spirit',
 *   name: undefined,
 *   additional_kwargs: {}
 * }
 * AIMessageChunk {
 *   lc_serializable: true,
 *   lc_kwargs: { content: ',', additional_kwargs: {} },
 *   lc_namespace: [ 'langchain_core', 'messages' ],
 *   content: ',',
 *   name: undefined,
 *   additional_kwargs: {}
 * }
 * AIMessageChunk {
 *   lc_serializable: true,
 *   lc_kwargs: { content: ' they', additional_kwargs: {} },
 *   lc_namespace: [ 'langchain_core', 'messages' ],
 *   content: ' they',
 *   name: undefined,
 *   additional_kwargs: {}
 * }
 * AIMessageChunk {
 *   lc_serializable: true,
 *   lc_kwargs: { content: ' worked', additional_kwargs: {} },
 *   lc_namespace: [ 'langchain_core', 'messages' ],
 *   content: ' worked',
 *   name: undefined,
 *   additional_kwargs: {}
 * }
 * AIMessageChunk {
 *   lc_serializable: true,
 *   lc_kwargs: { content: ' together', additional_kwargs: {} },
 *   lc_namespace: [ 'langchain_core', 'messages' ],
 *   content: ' together',
 *   name: undefined,
 *   additional_kwargs: {}
 * }
 * AIMessageChunk {
 *   lc_serializable: true,
 *   lc_kwargs: { content: ' to', additional_kwargs: {} },
 *   lc_namespace: [ 'langchain_core', 'messages' ],
 *   content: ' to',
 *   name: undefined,
 *   additional_kwargs: {}
 * }
 * AIMessageChunk {
 *   lc_serializable: true,
 *   lc_kwargs: { content: ' overcome', additional_kwargs: {} },
 *   lc_namespace: [ 'langchain_core', 'messages' ],
 *   content: ' overcome',
 *   name: undefined,
 *   additional_kwargs: {}
 * }
 * AIMessageChunk {
 *   lc_serializable: true,
 *   lc_kwargs: { content: ' countless', additional_kwargs: {} },
 *   lc_namespace: [ 'langchain_core', 'messages' ],
 *   content: ' countless',
 *   name: undefined,
 *   additional_kwargs: {}
 * }
 * AIMessageChunk {
 *   lc_serializable: true,
 *   lc_kwargs: { content: ' obstacles', additional_kwargs: {} },
 *   lc_namespace: [ 'langchain_core', 'messages' ],
 *   content: ' obstacles',
 *   name: undefined,
 *   additional_kwargs: {}
 * }
 * AIMessageChunk {
 *   lc_serializable: true,
 *   lc_kwargs: { content: ' and', additional_kwargs: {} },
 *   lc_namespace: [ 'langchain_core', 'messages' ],
 *   content: ' and',
 *   name: undefined,
 *   additional_kwargs: {}
 * }
 * AIMessageChunk {
 *   lc_serializable: true,
 *   lc_kwargs: { content: ' face', additional_kwargs: {} },
 *   lc_namespace: [ 'langchain_core', 'messages' ],
 *   content: ' face',
 *   name: undefined,
 *   additional_kwargs: {}
 * }
 * AIMessageChunk {
 *   lc_serializable: true,
 *   lc_kwargs: { content: ' dangerous', additional_kwargs: {} },
 *   lc_namespace: [ 'langchain_core', 'messages' ],
 *   content: ' dangerous',
 *   name: undefined,
 *   additional_kwargs: {}
 * }
 * AIMessageChunk {
 *   lc_serializable: true,
 *   lc_kwargs: { content: ' foes', additional_kwargs: {} },
 *   lc_namespace: [ 'langchain_core', 'messages' ],
 *   content: ' foes',
 *   name: undefined,
 *   additional_kwargs: {}
 * }
 * AIMessageChunk {
 *   lc_serializable: true,
 *   lc_kwargs: { content: '.', additional_kwargs: {} },
 *   lc_namespace: [ 'langchain_core', 'messages' ],
 *   content: '.',
 *   name: undefined,
 *   additional_kwargs: {}
 * }
 * AIMessageChunk {
 *   lc_serializable: true,
 *   lc_kwargs: { content: ' Join', additional_kwargs: {} },
 *   lc_namespace: [ 'langchain_core', 'messages' ],
 *   content: ' Join',
 *   name: undefined,
 *   additional_kwargs: {}
 * }
 * AIMessageChunk {
 *   lc_serializable: true,
 *   lc_kwargs: { content: ' us', additional_kwargs: {} },
 *   lc_namespace: [ 'langchain_core', 'messages' ],
 *   content: ' us',
 *   name: undefined,
 *   additional_kwargs: {}
 * }
 * AIMessageChunk {
 *   lc_serializable: true,
 *   lc_kwargs: { content: ' as', additional_kwargs: {} },
 *   lc_namespace: [ 'langchain_core', 'messages' ],
 *   content: ' as',
 *   name: undefined,
 *   additional_kwargs: {}
 * }
 * AIMessageChunk {
 *   lc_serializable: true,
 *   lc_kwargs: { content: ' we', additional_kwargs: {} },
 *   lc_namespace: [ 'langchain_core', 'messages' ],
 *   content: ' we',
 *   name: undefined,
 *   additional_kwargs: {}
 * }
 * AIMessageChunk {
 *   lc_serializable: true,
 *   lc_kwargs: { content: ' explore', additional_kwargs: {} },
 *   lc_namespace: [ 'langchain_core', 'messages' ],
 *   content: ' explore',
 *   name: undefined,
 *   additional_kwargs: {}
 * }
 * AIMessageChunk {
 *   lc_serializable: true,
 *   lc_kwargs: { content: ' the', additional_kwargs: {} },
 *   lc_namespace: [ 'langchain_core', 'messages' ],
 *   content: ' the',
 *   name: undefined,
 *   additional_kwargs: {}
 * }
 * AIMessageChunk {
 *   lc_serializable: true,
 *   lc_kwargs: { content: ' epic', additional_kwargs: {} },
 *   lc_namespace: [ 'langchain_core', 'messages' ],
 *   content: ' epic',
 *   name: undefined,
 *   additional_kwargs: {}
 * }
 * AIMessageChunk {
 *   lc_serializable: true,
 *   lc_kwargs: { content: ' tale', additional_kwargs: {} },
 *   lc_namespace: [ 'langchain_core', 'messages' ],
 *   content: ' tale',
 *   name: undefined,
 *   additional_kwargs: {}
 * }
 * AIMessageChunk {
 *   lc_serializable: true,
 *   lc_kwargs: { content: ' of', additional_kwargs: {} },
 *   lc_namespace: [ 'langchain_core', 'messages' ],
 *   content: ' of',
 *   name: undefined,
 *   additional_kwargs: {}
 * }
 * AIMessageChunk {
 *   lc_serializable: true,
 *   lc_kwargs: { content: ' these', additional_kwargs: {} },
 *   lc_namespace: [ 'langchain_core', 'messages' ],
 *   content: ' these',
 *   name: undefined,
 *   additional_kwargs: {}
 * }
 * AIMessageChunk {
 *   lc_serializable: true,
 *   lc_kwargs: { content: ' warriors', additional_kwargs: {} },
 *   lc_namespace: [ 'langchain_core', 'messages' ],
 *   content: ' warriors',
 *   name: undefined,
 *   additional_kwargs: {}
 * }
 * AIMessageChunk {
 *   lc_serializable: true,
 *   lc_kwargs: { content: ',', additional_kwargs: {} },
 *   lc_namespace: [ 'langchain_core', 'messages' ],
 *   content: ',',
 *   name: undefined,
 *   additional_kwargs: {}
 * }
 * AIMessageChunk {
 *   lc_serializable: true,
 *   lc_kwargs: { content: ' filled', additional_kwargs: {} },
 *   lc_namespace: [ 'langchain_core', 'messages' ],
 *   content: ' filled',
 *   name: undefined,
 *   additional_kwargs: {}
 * }
 * AIMessageChunk {
 *   lc_serializable: true,
 *   lc_kwargs: { content: ' with', additional_kwargs: {} },
 *   lc_namespace: [ 'langchain_core', 'messages' ],
 *   content: ' with',
 *   name: undefined,
 *   additional_kwargs: {}
 * }
 * AIMessageChunk {
 *   lc_serializable: true,
 *   lc_kwargs: { content: ' adventure', additional_kwargs: {} },
 *   lc_namespace: [ 'langchain_core', 'messages' ],
 *   content: ' adventure',
 *   name: undefined,
 *   additional_kwargs: {}
 * }
 * AIMessageChunk {
 *   lc_serializable: true,
 *   lc_kwargs: { content: ',', additional_kwargs: {} },
 *   lc_namespace: [ 'langchain_core', 'messages' ],
 *   content: ',',
 *   name: undefined,
 *   additional_kwargs: {}
 * }
 * AIMessageChunk {
 *   lc_serializable: true,
 *   lc_kwargs: { content: ' friendship', additional_kwargs: {} },
 *   lc_namespace: [ 'langchain_core', 'messages' ],
 *   content: ' friendship',
 *   name: undefined,
 *   additional_kwargs: {}
 * }
 * AIMessageChunk {
 *   lc_serializable: true,
 *   lc_kwargs: { content: ',', additional_kwargs: {} },
 *   lc_namespace: [ 'langchain_core', 'messages' ],
 *   content: ',',
 *   name: undefined,
 *   additional_kwargs: {}
 * }
 * AIMessageChunk {
 *   lc_serializable: true,
 *   lc_kwargs: { content: ' and', additional_kwargs: {} },
 *   lc_namespace: [ 'langchain_core', 'messages' ],
 *   content: ' and',
 *   name: undefined,
 *   additional_kwargs: {}
 * }
 * AIMessageChunk {
 *   lc_serializable: true,
 *   lc_kwargs: { content: ' triumph', additional_kwargs: {} },
 *   lc_namespace: [ 'langchain_core', 'messages' ],
 *   content: ' triumph',
 *   name: undefined,
 *   additional_kwargs: {}
 * }
 * AIMessageChunk {
 *   lc_serializable: true,
 *   lc_kwargs: { content: '.', additional_kwargs: {} },
 *   lc_namespace: [ 'langchain_core', 'messages' ],
 *   content: '.',
 *   name: undefined,
 *   additional_kwargs: {}
 * }
 * AIMessageChunk {
 *   lc_serializable: true,
 *   lc_kwargs: { content: '', additional_kwargs: {} },
 *   lc_namespace: [ 'langchain_core', 'messages' ],
 *   content: '',
 *   name: undefined,
 *   additional_kwargs: {}
 * }
 */
