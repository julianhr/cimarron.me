import { createSerializer as enzymeToJsonSerializer } from 'enzyme-to-json'

expect.addSnapshotSerializer(enzymeToJsonSerializer({ mode: 'deep' }))
