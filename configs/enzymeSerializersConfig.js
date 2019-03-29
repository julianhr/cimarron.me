import { createSerializer as emotionSerializer } from 'jest-emotion'
import { createSerializer as enzymeToJsonSerializer } from 'enzyme-to-json'

expect.addSnapshotSerializer(emotionSerializer())
expect.addSnapshotSerializer(enzymeToJsonSerializer({ mode: 'deep' }))
